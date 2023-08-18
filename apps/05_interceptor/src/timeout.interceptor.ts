import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          console.log(err);
          // return throwError(() => new HttpException('xxx', HttpStatus.FOUND));
          return throwError(() => new RequestTimeoutException()); // 这个有内置的 exception filter 会处理成对应的响应格式{
          //   "statusCode": 408,
          //     "message": "Request Timeout"
          // }
        }
        return throwError(() => err);
      }),
    );
  }
}
