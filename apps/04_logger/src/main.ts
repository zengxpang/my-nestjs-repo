import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger1, MyLogger2, MyLogger3 } from './myLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    // logger: ['error', 'warn'],
    // logger: new MyLogger1(),
    // logger: new MyLogger2(),
    bufferLogs: true, // 先不打印日志，先缓存起来，等到useLogger指定了 Logger 并且应用初始化完毕
  });
  app.useLogger(app.get(MyLogger3)); // app.get 就是从容器中取这个类的实例的，我们写一个 Logger3 类放到容器里：
  await app.listen(3000);
}
bootstrap();
