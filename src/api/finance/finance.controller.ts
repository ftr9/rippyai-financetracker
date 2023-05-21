import { Controller, Post, Body, Put } from '@nestjs/common';
import { addMonthlyPlanDto } from './dtos/addMonthlyPlan.dto';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('monthlyplan')
  addMonthlyPlan(@Body() body: addMonthlyPlanDto) {
    return this.financeService.addMonthlyPlan(body);
  }
  @Put('monthlyplan')
  modifyAndAddMonthlyPlan(@Body() body: addMonthlyPlanDto) {
    return this.financeService.modifyAndAddMonthlyPlan(body);
  }
}
