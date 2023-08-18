import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AaaInterceptor } from './aaa.interceptor';
import { MapTestInterceptor } from './map-test.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AaaInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MapTestInterceptor,
    },
  ],
})
export class AppModule {}
