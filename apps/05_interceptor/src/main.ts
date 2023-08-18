import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AaaInterceptor } from './aaa.interceptor';
import { CatchErrorTestFilter } from './catch-error-test.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new AaaInterceptor());
  app.useGlobalFilters(new CatchErrorTestFilter());
  await app.listen(3000);
}
bootstrap();
