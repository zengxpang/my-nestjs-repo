import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { RedisService } from './redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject()
  private readonly reflector: Reflector;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.user) {
      // 登录的接口
      return true;
    }

    // 查找 redis 中 的用户权限
    let permissionsList = await this.redisService.listGet(
      `user_${request.user.username}_permissions`,
    );

    // 如果 redis 中没有用户权限，就从数据库中查找,并且存到 redis
    if (permissionsList?.length === 0) {
      const roles = await this.userService.findRoleByIds(
        request.user.roles.map((item) => item.id),
      );
      permissionsList = roles.reduce((acc, cur) => {
        acc.push(...cur.permissions);
        return acc.map((item) => item.name);
      }, []);
      await this.redisService.listSet(
        `user_${request.user.username}_permissions`,
        permissionsList,
        60 * 30, // 30 分钟
      );
    }

    const requiredPermissions = this.reflector.getAllAndOverride(
      'required-permission',
      [context.getHandler(), context.getClass()],
    );
    console.log(request.user);
    console.log(permissionsList);
    console.log(requiredPermissions);

    for (let i = 0; i < requiredPermissions.length; i++) {
      const currPermission = requiredPermissions[i];
      const found = permissionsList.find((item) => item === currPermission);
      if (!found) {
        throw new UnauthorizedException('你没有该接口的权限');
      }
    }

    return true;
  }
}
