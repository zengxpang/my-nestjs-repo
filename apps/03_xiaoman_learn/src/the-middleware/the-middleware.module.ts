import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TheMiddlewareService } from './the-middleware.service';
import { TheMiddlewareController } from './the-middleware.controller';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  controllers: [TheMiddlewareController],
  providers: [TheMiddlewareService],
})
export class TheMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'v1/the-middleware*',
      method: RequestMethod.GET,
    });
  }
}
