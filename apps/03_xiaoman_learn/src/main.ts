import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors(); // enable cors
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images',
  });
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      name: 'zxp.session',
      rolling: true,
      cookie: {
        maxAge: null,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
