import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { IaddExpenseBody } from './interfaces/addExpenseBody.interface';
import { IgetExpenseQuery } from './interfaces/getExpenseQuery.interface';
import { IexpensesMetricQuery } from './interfaces/expensesMetricQuery.interface';
import { FinanceService } from '../finance/finance.service';
import { EmailService } from 'src/utils/email/Email.service';
import { User } from '@prisma/client';
import getBudgetThresholdMailBody from 'src/utils/email/getBudgetThresholdMailBody';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly financeService: FinanceService,
  ) {}

  private makeQueryForSingleDate = (date: string) => {
    if (!date) {
      return {
        gte: undefined,
        lte: undefined,
      };
    }
    const startTime = new Date(date);
    startTime.setHours(0, 0, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(23, 59, 59, 999);
    //console.log(startTime.toISOString(), endTime.toISOString());
    //console.log(startTime, endTime);
    return {
      gte: startTime,
      lte: endTime,
    };
  };

  private makeQueryForMultipleDate(from: string, to: string) {
    const startDate = new Date(from);
    startDate.setDate(startDate.getDate() - 1);
    const endDate = new Date(to);
    endDate.setDate(endDate.getDate() + 1);
    return {
      gte: startDate,
      lte: endDate,
    };
  }

  async getAllExpenses(query: IgetExpenseQuery) {
    const queryLimit = query.limit ? query.limit : 10;
    const isDateEqual = query.from === query.to;
    const isSingleDate = query.from && !query.to;
    const createdAtProp =
      isDateEqual || isSingleDate
        ? this.makeQueryForSingleDate(query.from)
        : this.makeQueryForMultipleDate(query.from, query.to);

    //console.log(new Date(query.from).toLocaleDateString());
    const allExpenditures = await this.prismaService.expenditures.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId: query.userId,
        category: query.category,
        createdAt: createdAtProp,
      },
      skip: query.page ? (query.page - 1) * queryLimit : 0,
      take: queryLimit,
    });

    return allExpenditures;
  }

  async addExpense(body: IaddExpenseBody, user: User) {
    //1)
    const activeMonthlyPlan = await this.financeService.getActiveMonthlyPlan(
      body.userId,
    );

    //2)
    if (activeMonthlyPlan.remainingExpense < body.amount) {
      throw new NotAcceptableException(
        'your remaining expense amount is less than the amount you provided ',
      );
    }

    await this.financeService._deductExpenseBudget(
      activeMonthlyPlan.id,
      body.amount,
    );

    const createdExpense = await this.prismaService.expenditures.create({
      data: {
        ...body,
        expenseBudget: activeMonthlyPlan.expenseBudget,
        remainingExpense: activeMonthlyPlan.remainingExpense - body.amount,
      },
    });

    //3)check for threshold
    const expenseLimitThreshold =
      (createdExpense.remainingExpense / createdExpense.expenseBudget) * 100;
    if (expenseLimitThreshold <= 20) {
      const emailService = new EmailService(
        user.email,
        user.username,
        'Budget Spending Alert !!!',
        getBudgetThresholdMailBody({
          message: `You have spent ${
            100 - expenseLimitThreshold
          }% of your total expense`,
        }),
      );
      try {
        await emailService.sendMail();
      } catch (err) {
        console.log('Failed to send email');
      }
    }

    return createdExpense;
  }

  async summarizeExpenses(query: IexpensesMetricQuery, userId: string) {
    return await this.prismaService.expenditures.groupBy({
      by: ['category'],
      where: {
        userId: userId,
        createdAt: {
          gte: query.from,
          lte: query.to,
        },
      },
      _sum: {
        amount: true,
      },
    });
  }
}
