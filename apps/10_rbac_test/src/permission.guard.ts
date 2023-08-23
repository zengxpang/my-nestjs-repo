import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject()
  private readonly reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.user) {
      // 登录的接口
      return true;
    }

    const roles = await this.userService.findRoleByIds(
      request.user.roles.map((item) => item.id),
    );

    const permissions = roles.reduce((acc, cur) => {
      acc.push(...cur.permissions);
      return acc;
    }, []);

    const requiredPermissions = this.reflector.getAllAndOverride(
      'required-permission',
      [context.getHandler(), context.getClass()],
    );
    console.log(request.user);
    console.log(permissions);
    console.log(requiredPermissions);

    for (let i = 0; i < requiredPermissions.length; i++) {
      const currPermission = requiredPermissions[i];
      const found = permissions.find((item) => item.name === currPermission);
      if (!found) {
        throw new UnauthorizedException('你没有该接口的权限');
      }
    }

    return true;
  }
}
