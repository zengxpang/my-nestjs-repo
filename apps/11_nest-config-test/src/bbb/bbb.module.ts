import { Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 这里是再次验证了动态模块的 forRoot 用于在 AppModule 里注册，一般指定为全局模块，
    // forFeature 用于局部配置，在不同模块里 imports
    // 而 register 用于一次性的配置。
    ConfigModule.forFeature(() => {
      return {
        ddd: 222,
      };
    }),
  ],
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule {}
