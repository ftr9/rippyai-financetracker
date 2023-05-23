import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { loginUserDto } from './dtos/loginUser.dtos';
import { registerUserDto } from './dtos/registerUser.dto';
import { AuthGuard } from 'src/common/guards/Auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: loginUserDto, @Res() res: Response) {
    return this.authService.login(body, res);
  }

  @Post('register')
  register(@Body() body: registerUserDto) {
    return this.authService.register(body);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt-rippyai');
    res.status(200).json({
      status: 'success',
      message: 'logged out successfully',
    });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getLoggedInUser(@Req() req: Request) {
    req.user.password = undefined;
    return req.user;
  }
}
