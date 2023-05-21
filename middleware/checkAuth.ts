import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.oidc.isAuthenticated()) {
    throw new UnauthorizedException('please login ');
  }
  next();
};

export default checkAuth;
