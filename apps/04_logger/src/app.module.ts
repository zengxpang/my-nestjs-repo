import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLogger3 } from './myLogger';
import { LoggerModule } from './logger/logger.module';
import { AaaModule } from './aaa/aaa.module';
import { Logger2Module } from './logger2/logger2.module';

@Module({
  imports: [
    LoggerModule,
    AaaModule,
    Logger2Module.register({
      x: 1,
      y: 2,
      z: 3,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MyLogger3],
})
export class AppModule {}
