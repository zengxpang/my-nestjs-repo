import { Inject, Injectable } from '@nestjs/common';
import { MyLogger } from './logger2/myLogger';

@Injectable()
export class AppService {
  @Inject(MyLogger) private readonly myLogger: MyLogger;

  getHello(): string {
    this.myLogger.log('我疯狂了', AppService.name);
    return 'Hello World!';
  }
}
