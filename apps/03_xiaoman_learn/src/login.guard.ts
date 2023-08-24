import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user: {
      username: string;
      userId: number;
    };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('请登录');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);
      request.user = data;
      return true;
    } catch (e) {
      throw new UnauthorizedException('token过期，请重新登录');
    }
  }
}
