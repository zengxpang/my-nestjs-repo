import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { TheMiddlewareService } from './the-middleware.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // @Inject(TheMiddlewareService)
  // private readonly theMiddlewareService: TheMiddlewareService;

  constructor(private readonly theMiddlewareService: TheMiddlewareService) {}
  use(req: Request, res: Response, next: () => void) {
    console.log('before');
    console.log(this.theMiddlewareService.findAll());
    next();
    console.log('after');
  }
}
