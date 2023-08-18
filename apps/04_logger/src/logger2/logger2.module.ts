import { DynamicModule, Module } from '@nestjs/common';
import { MyLogger } from './myLogger';

@Module({})
export class Logger2Module {
  static register(options): DynamicModule {
    return {
      module: Logger2Module,
      providers: [
        MyLogger,
        {
          provide: 'LOG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [MyLogger, 'LOG_OPTIONS'],
    };
  }
}
