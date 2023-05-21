import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { auth } from 'express-openid-connect';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
//Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'rahuldotel@rippy.api',
  baseURL: 'http://localhost:4050',
  clientID: 'o0jh0F9Nxk3NfGt8JBeRsnC0Imm16cYO',
  issuerBaseURL: 'https://dev-wl7khdxxvnpamirm.us.auth0.com',
};

const PORT = process.env.PORT || 4050;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Auth0 Middleware
  app.use(auth(config));

  //validation Middleware
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory(errors: ValidationError[]) {
        throw new BadRequestException(errors);
      },
    }),
  );
  await app.listen(PORT);
  console.log(`server has been started on PORT ${PORT}`);
}
bootstrap();
