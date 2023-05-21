import { Controller, Get, Req, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  getuser(@Req() req: Request) {
    const authenticatedUser = req.oidc.user;
    if (authenticatedUser) {
      return authenticatedUser;
    }
    throw new NotFoundException('user not found');
  }
}
