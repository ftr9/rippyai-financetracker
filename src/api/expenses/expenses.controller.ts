import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ExpensesService } from './expenses.service';
import { addExpenseDto } from './dtos/addExpense.dto';
import { getExpenseQueryDto } from './dtos/getExpenseQuery.dto';
import { expensesMetricQueryDto } from './dtos/expensesMetricQuery.dto';
import { AuthGuard } from 'src/common/guards/Auth.guard';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('/')
  getExpenses(@Query() query: getExpenseQueryDto, @Req() req: Request) {
    return this.expensesService.getAllExpenses({
      ...query,
      userId: req.user.id,
    });
  }

  @Post('/')
  addExpense(@Body() body: addExpenseDto, @Req() req: Request) {
    return this.expensesService.addExpense({ ...body, userId: req.user.id });
  }

  /*
  @Get('/summarize')
  summarizeExpenses(@Query() query: expensesMetricQueryDto) {
    return this.expensesService.summarizeExpenses(query);
  }

  @Get('/summarizeval')
  summarizeVal() {
    return this.expensesService.summarizeVal();
  }
  */
}
