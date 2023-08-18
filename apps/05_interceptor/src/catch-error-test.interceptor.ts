import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

// 错误拦截器
@Injectable()
export class CatchErrorTestInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CatchErrorTestInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        //
        this.logger.error(err.message, err.stack);
        return throwError(() => err);
      }),
    );
  }
}
