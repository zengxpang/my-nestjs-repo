import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Headers() header): string {
    // console.log(header);
    console.log('access');
    return this.appService.getHello();
  }
}
