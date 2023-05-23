import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './api/expenses/expenses.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { AuthModule } from './api/auth/auth.module';
import { FinanceModule } from './api/finance/finance.module';
import { JwtService } from './utils/jwt/jwt.service';

//import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ExpensesModule, PrismaModule, AuthModule, FinanceModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
