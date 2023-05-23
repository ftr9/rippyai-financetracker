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

  /*
  private _filterExpenseQuery(query: IgetExpenseQuery) {
    const queryLimit = query.limit ? query.limit : 50;
    return {
      where: {
        category: query.category
          ? { in: query.category.split(',') }
          : undefined,
        createdAt: {
          gte: query.from,
          lte: query.to,
        },
      },
      skip: query.page ? (query.page - 1) * queryLimit : 0,
      take: queryLimit,
    };
  }

  async getAllExpenses(query: IgetExpenseQuery) {
    const allExpenditures = await this.prismaService.expenditures.findMany(
      this._filterExpenseQuery(query),
    );
    return allExpenditures;
  }

  async addExpense(body: IaddExpenseBody) {
    //1)
    const activeMonthlyPlan = await this.financeService.getActiveMonthlyPlan(
      body.user,
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

    //3)
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
*/
}
