import {
  Controller,
  Post,
  Body,
  Put,
  Req,
  UseGuards,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { addMonthlyPlanDto } from './dtos/addMonthlyPlan.dto';
import { FinanceService } from './finance.service';
import { Request } from 'express';
import { AuthGuard } from 'src/common/guards/Auth.guard';

@UseGuards(AuthGuard)
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('monthlyplan')
  async getMonthlyPlan(@Req() req: Request) {
    const activeMonthlyPlan = await this.financeService.getActiveMonthlyPlan(
      req.user.id,
    );
    if (!activeMonthlyPlan) {
      throw new NotFoundException('active Monthly plan not found');
    }
    return activeMonthlyPlan;
  }

  @Post('monthlyplan')
  addMonthlyPlan(@Body() body: addMonthlyPlanDto, @Req() req: Request) {
    return this.financeService.addMonthlyPlan({ ...body, userId: req.user.id });
  }
  @Put('monthlyplan')
  modifyAndAddMonthlyPlan(
    @Body() body: addMonthlyPlanDto,
    @Req() req: Request,
  ) {
    return this.financeService.modifyAndAddMonthlyPlan({
      ...body,
      userId: req.user.id,
    });
  }
}
