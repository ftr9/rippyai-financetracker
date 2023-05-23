import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as cookieparser from 'cookie-parser';
//Auth0 configuration

const PORT = process.env.PORT || 4050;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });
  app.use(cookieparser());
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
