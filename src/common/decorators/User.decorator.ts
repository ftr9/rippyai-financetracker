import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const DUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  return req.user;
});
