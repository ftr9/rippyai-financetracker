import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { IMonthlyPlanBody } from './interfaces/MonthlyPlanBody.interface';

@Injectable()
export class FinanceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getActiveMonthlyPlan(userId: string) {
    return this.prismaService.monthlyPlan.findFirst({
      where: {
        userId: userId,
        active: true,
      },
    });
  }

  public async _deductExpenseBudget(id: string, amount: number) {
    await this.prismaService.monthlyPlan.update({
      where: {
        id: id,
      },
      data: {
        remainingExpense: {
          decrement: amount,
        },
      },
    });
  }

  async addMonthlyPlan(body: IMonthlyPlanBody) {
    //check if entered values are valid

    const existingMonthlyPlan = await this.getActiveMonthlyPlan(body.userId);

    if (existingMonthlyPlan) {
      throw new NotAcceptableException(
        'you have active monthly plan already created.',
      );
    }

    this._checkValidAmount(body);

    const monthlyPlan = await this.prismaService.monthlyPlan.create({
      data: {
        ...body,
        remainingExpense: body.expenseBudget,
      },
    });

    return {
      status: 'success',
      message: 'Monthly plan added successfully',
      payload: monthlyPlan,
    };
  }

  async modifyAndAddMonthlyPlan(body: IMonthlyPlanBody) {
    //1)
    this._checkValidAmount(body);

    //2)
    const currentMonthTotalExpenses =
      await this._getCurrentMonthTotalExpenses();

    if (currentMonthTotalExpenses > body.expenseBudget) {
      throw new NotAcceptableException(
        `your expense budget is less than the amount you have spent till now on ${body.categories.join(
          ',',
        )}`,
      );
    }

    //3)
    const data = await this.prismaService.$transaction([
      //update existing monthly plan to inactive
      this.prismaService.monthlyPlan.update({
        where: {
          id: body.id,
        },
        data: {
          active: false,
        },
      }),
      //create new active monthly plan
      this.prismaService.monthlyPlan.create({
        data: {
          userId: body.userId,
          income: body.income,
          savings: body.savings,
          investment: body.investment,
          expenseBudget: body.expenseBudget,
          remainingExpense: body.expenseBudget - currentMonthTotalExpenses,
          categories: body.categories,
        },
      }),
    ]);

    return data[1];
  }

  private _checkValidAmount(body: IMonthlyPlanBody) {
    if (body.income < body.expenseBudget) {
      throw new NotAcceptableException(
        'expense budget must be less than income',
      );
    }
    if (body.income < body.investment) {
      throw new NotAcceptableException('investment must be less than income');
    }
    if (body.income < body.savings) {
      throw new NotAcceptableException('savings must be less than income');
    }

    if (body.income < body.expenseBudget + body.investment + body.savings) {
      throw new NotAcceptableException(
        `your expense budget,investment and savings amount in total ${
          body.expenseBudget + body.investment + body.savings
        } exceeds the income amount ${body.income}`,
      );
    }
  }

  private async _getCurrentMonthTotalExpenses() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const {
      _sum: { amount: currentMonthTotalExpense },
    } = await this.prismaService.expenditures.aggregate({
      where: {
        createdAt: {
          gte: new Date(`${currentYear}/${currentMonth}/1`),
          lte: currentDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return currentMonthTotalExpense;
  }
  //"rent","grocery","transportation","tiffin"
}
