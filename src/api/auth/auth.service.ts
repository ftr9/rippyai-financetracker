import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { IRegisterUser } from './interfaces/registerUser.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { ILoginUser } from './interfaces/loginUser.interface';
import { JwtService } from 'src/utils/jwt/jwt.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: ILoginUser, res: Response) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('invalid email address or password');
    }
    //2. check the password
    const isCorrectPassword = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException('invalid username or password');
    }

    //3.generate the token
    const jwtToken = this.jwtService._generateToken({
      id: user.id,
    });
    res.cookie('jwt-rippyai', jwtToken, {
      maxAge: 1000 * 60 * 60 * 10,
    });
    res.status(200).json({
      status: 'success',
      message: 'logged in successfully',
    });
  }

  async register(body: IRegisterUser) {
    try {
      //1. hash the password
      body.password = await bcrypt.hash(body.password, 10);

      //2.store the user in DB
      await this.prismaService.user.create({
        data: {
          username: body.username,
          email: body.email,
          password: body.password,
        },
      });
      //3. generate token and login to continue
      return {
        status: 'success',
        message: 'please login to continue',
      };
    } catch (err) {
      this._catchSignUpError(err);
    }
  }
  private _catchSignUpError(err) {
    const isDuplicateError = err.code === 'P2002';

    if (isDuplicateError) {
      const targetField: { target?: string } = err.meta;
      const targetFieldName = targetField.target.split('_')[1];
      throw new HttpException(`${targetFieldName} already exists.`, 400);
    } else {
      throw new InternalServerErrorException('Opps ! something went wrong');
    }
  }
}
