import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/db/prisma/prisma.service';

import { JwtService } from 'src/utils/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const jwtToken = req.cookies['jwt-rippyai'];

    if (!jwtToken) {
      return false;
    }

    const { id } = await this.jwtService._verifyToken(jwtToken);
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return false;
    }
    req.user = user;
    return true;
  }
}
