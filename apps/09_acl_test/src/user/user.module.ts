import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PermissionGuard } from './permission.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, PermissionGuard], // PermissionGuard 在 providers 里面才能被注入
  exports: [UserService, PermissionGuard],
})
export class UserModule {}
