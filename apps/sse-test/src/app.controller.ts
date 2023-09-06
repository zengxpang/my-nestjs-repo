import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import * as child_process from 'child_process';
const { exec } = child_process;
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('stream')
  stream() {
    return new Observable((observer) => {
      observer.next({
        data: {
          message: 'aaa',
        },
      });
      setTimeout(() => {
        observer.next({
          data: {
            message: 'bbb',
          },
        });
      }, 2000);

      setTimeout(() => {
        observer.next({
          data: {
            message: 'ccc',
          },
        });
      }, 4000);
    });
  }

  @Sse('stream2')
  stream1() {
    const childProcess = exec('tail -f ./log');
    return new Observable((observer) => {
      childProcess.stdout.on('data', (msg) => {
        observer.next({ data: { msg: msg.toString() } });
      });
    });
  }

  @Sse('stream3')
  stream3() {
    return new Observable((observer) => {
      //二进制数据在 node 里是通过 Buffer 存储的，Buffer 有一个 toString 方法
      const json = readFileSync('./package.json').toJSON();
      observer.next({ data: { msg: json } });
    });
  }
}
