import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  constructor(private appService: AppService) {}

  private readonly logger = new Logger(AaaInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // tap不会改变数据，只是额外执行一段逻辑
    return next.handle().pipe(
      tap((data) => {
        console.log(AaaInterceptor.name);
        // 这里是更新缓存的操作，这里模拟下
        this.appService.getHello();
        this.logger.log('log something', data);
      }),
    );
  }
}
