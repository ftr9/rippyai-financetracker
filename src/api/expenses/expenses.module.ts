import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { FinanceModule } from '../finance/finance.module';
import { JwtService } from 'src/utils/jwt/jwt.service';

@Module({
  imports: [PrismaModule, FinanceModule],
  controllers: [ExpensesController],
  providers: [ExpensesService, JwtService],
})
export class ExpensesModule {}
