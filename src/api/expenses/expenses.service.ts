import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { IaddExpenseBody } from './interfaces/addExpenseBody.interface';
import { IgetExpenseQuery } from './interfaces/getExpenseQuery.interface';
import { IexpensesMetricQuery } from './interfaces/expensesMetricQuery.interface';
import { FinanceService } from '../finance/finance.service';

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

  async addExpense(body: IaddExpenseBody) {
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
      console.log(
        `you have spent ${100 - expenseLimitThreshold}% of your expenses`,
      );
    }

    return createdExpense;
  }

  async summarizeExpenses(query: IexpensesMetricQuery) {
    return await this.prismaService.expenditures.groupBy({
      by: ['category'],
      where: {
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

  async summarizeVal() {
    return await this.prismaService.expenditures.groupBy({
      by: ['createdAt'],
      _sum: {
        amount: true,
      },
    });
  }
}
