import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

// 错误过滤器
@Catch(HttpException)
export class CatchErrorTestFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    response.status(status).json({
      data: exception.message,
      time: new Date().getTime(),
      success: false,
      path: request.url,
      status,
    });
  }
}
