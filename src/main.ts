import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
// import * as cookieParser from 'cookie-parser';
// import * as session from 'express-session';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [`'self'`],
          scriptSrc: [`'self'`],
          manifestSrc: [`'self'`],
          frameSrc: [`'self'`],
        },
      },
    }),
  );
  // app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: 'your_secret_key',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       httpOnly: true,
  //       sameSite: 'strict',
  //     } as session.CookieOptions,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
