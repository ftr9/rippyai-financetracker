import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './api/expenses/expenses.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { AuthModule } from './api/auth/auth.module';
import { FinanceModule } from './api/finance/finance.module';
import { JwtService } from './utils/jwt/jwt.service';
import { ReminderModule } from './api/reminder/reminder.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LoanReminderTask } from './notification/LoanReminder.notification';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ExpensesModule,
    PrismaModule,
    AuthModule,
    FinanceModule,
    ReminderModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, LoanReminderTask],
})
export class AppModule {}
