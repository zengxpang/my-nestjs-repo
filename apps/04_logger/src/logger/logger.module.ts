import { Global, Module } from '@nestjs/common';
import { MyLogger1 } from '../myLogger';

@Global()
@Module({
  providers: [MyLogger1],
  exports: [MyLogger1],
})
export class LoggerModule {}
