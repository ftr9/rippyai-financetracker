import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { JwtService } from 'src/utils/jwt/jwt.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReminderController],
  providers: [ReminderService, JwtService],
})
export class ReminderModule {}
