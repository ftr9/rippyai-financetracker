import { Injectable, Query } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { IaddExpenseBody } from './interfaces/addExpenseBody.interface';
import { IgetExpenseQuery } from './interfaces/getExpenseQuery.interface';
import { IexpensesMetricQuery } from './interfaces/expensesMetricQuery.interface';

@Injectable()
export class ExpensesService {
  constructor(private readonly prismaService: PrismaService) {}

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
    const createdExpense = await this.prismaService.expenditures.create({
      data: body,
    });
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
}
