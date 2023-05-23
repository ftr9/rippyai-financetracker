import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { JwtService } from 'src/utils/jwt/jwt.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
