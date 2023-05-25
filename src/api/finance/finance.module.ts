import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { JwtService } from 'src/utils/jwt/jwt.service';

@Module({
  imports: [PrismaModule],
  controllers: [FinanceController],
  providers: [FinanceService, JwtService],
  exports: [FinanceService],
})
export class FinanceModule {}
