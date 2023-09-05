import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('sum')
  sum(numArr: Array<number>): number {
    return numArr.reduce((curr, prev) => curr + prev, 0);
  }

  @EventPattern('log')
  log(str: string) {
    console.log(str);
  }
}
