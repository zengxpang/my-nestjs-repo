import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Inject('USER_SERVICE')
  private readonly userClient: ClientProxy;

  @Get('sum')
  calc(@Query('num') str: string): Observable<any> {
    const numArr = str.split(',').map((item) => parseInt(item));
    // @MessagePattern 声明的方法，这边要用 send 方法调用。
    // 而 @EventPattern 声明的方法，这边要用 emit 方法调用。
    this.userClient.emit('log', '求和');
    return this.userClient.send('sum', numArr);
  }
}
