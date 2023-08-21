import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

// 自定义的异常类
export class AaaException {
  constructor(public aaa: string, public bbb: string) {}
}

// Nest 会 catch 所有未捕获异常，如果是 Exception Filter 声明的异常，那就会调用 filter 来处理。
@Catch(AaaException)
export class AaaFilter implements ExceptionFilter {
  catch(exception: AaaException, host: ArgumentsHost) {
    console.log(exception, host);
    const type = host.getType();
    switch (type) {
      case 'http':
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        response.status(500).json({
          aaa: exception.aaa,
          bbb: exception.bbb,
        });
        break;
      case 'rpc':
        console.log('rpc');
        break;
      case 'ws':
        console.log('ws');
        break;
    }
  }
}
