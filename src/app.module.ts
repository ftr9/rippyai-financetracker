import { Module } from '@nestjs/common';

import { ExpensesModule } from './api/expenses/expenses.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { AuthModule } from './api/auth/auth.module';
import { FinanceModule } from './api/finance/finance.module';
import { JwtService } from './utils/jwt/jwt.service';
import { ReminderModule } from './api/reminder/reminder.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LoanReminderTask } from './notification/LoanReminder.notification';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
    }),
    ScheduleModule.forRoot(),
    ExpensesModule,
    PrismaModule,
    AuthModule,
    FinanceModule,
    ReminderModule,
  ],
  controllers: [],
  providers: [JwtService, LoanReminderTask],
})
export class AppModule {}
