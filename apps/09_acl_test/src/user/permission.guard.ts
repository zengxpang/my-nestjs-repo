import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.session.user;
    if (!user) {
      throw new UnauthorizedException('请先登录');
    }

    // 查找 redis 中 的用户权限
    let permissionsList = await this.redisService.listGet(
      `user_${user.username}_permissions`,
    );

    if (permissionsList.length === 0) {
      // 如果 redis 中没有用户权限，就从数据库中查找,并且存到 redis
      const foundUser = await this.userService.findByUsername(user.username);
      permissionsList = foundUser.permissions.map((item) => item.name);
      await this.redisService.listSet(
        `user_${user.username}_permissions`,
        permissionsList,
        60 * 30, // 30 分钟
      );
    }

    const permission = this.reflector.get('permission', context.getHandler());
    console.log(permission);
    console.log(permissionsList);

    if (permissionsList.some((item) => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
