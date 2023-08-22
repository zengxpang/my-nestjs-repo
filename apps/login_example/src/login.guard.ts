import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const authorization = request.header('authorization') || '';
    const bearer = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('登录token错误');
    }

    const token = bearer[1];
    try {
      const info = this.jwtService.verify(token);
      // (request as any).user = info.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('登录token失效,请重新登录!');
    }
  }
}
