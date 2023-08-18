import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaInterceptor } from './aaa.interceptor';
import { MapTestInterceptor } from './map-test.interceptor';
import { CatchErrorTestInterceptor } from './catch-error-test.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseInterceptors(AaaInterceptor)
  // @UseInterceptors(MapTestInterceptor)
  // @UseInterceptors(CatchErrorTestInterceptor)
  // @UseInterceptors(TimeoutInterceptor)
  async getHello(): Promise<string> {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.appService.getHello();
  }

  @Get('test')
  test() {
    return 'test';
  }
}
