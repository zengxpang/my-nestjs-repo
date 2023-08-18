// 4 使用动态模块
import { ConsoleLogger, Inject } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  @Inject('LOG_OPTIONS') public options: Record<string, any>;
  log(message: string, context: string) {
    console.log(this.options);
    console.log(`[${context}]+++++`, message);
    console.log('--------------');
  }
}
