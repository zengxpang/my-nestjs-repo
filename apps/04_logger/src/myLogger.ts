import {
  ConsoleLogger,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { AppService } from './app.service';

// 1.2 是手动 new 的对象，没有办法使用依赖注入，因为 Logger 是在容器外面创建的
// 1. 自己实现
export class MyLogger1 implements LoggerService {
  log(message: string, context: string) {
    console.log(`---log---[${context}]---`, message);
  }

  error(message: string, context: string) {
    console.log(`---error---[${context}]---`, message);
  }
  warn(message: string, context: string) {
    console.log(`---warn---[${context}]---`, message);
  }
}

// 2. 继承ConsoleLogger,也可以重写某些方法
export class MyLogger2 extends ConsoleLogger {
  log(message: string, context: string) {
    console.log(`[${context}]+++++`, message);
  }
}

// 3. 使用依赖注入
@Injectable() // 添加 @Injectable() 装饰器，代表这是一个 provider，并且要在 Module 里引入：
export class MyLogger3 extends ConsoleLogger {
  @Inject(AppService) private readonly appService: AppService;

  log(message: any, context?: string) {
    console.log(this.appService.getHello());
    console.log(`[${context}]`, message);
    console.log('--------------');
  }
}
