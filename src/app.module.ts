import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './api/expenses/expenses.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { AuthModule } from './api/auth/auth.module';
import { FinanceModule } from './api/finance/finance.module';

@Module({
  imports: [ExpensesModule, PrismaModule, AuthModule, FinanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
