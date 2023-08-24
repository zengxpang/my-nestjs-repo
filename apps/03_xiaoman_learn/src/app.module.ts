import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { ConfigModule } from './config/config.module';
import { DynamicModuleModule } from './dynamic-module/dynamic-module.module';
import { TheMiddlewareModule } from './the-middleware/the-middleware.module';
import { TheUploadModule } from './the-upload/the-upload.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    PersonModule,
    ConfigModule,
    DynamicModuleModule.register({
      name: '我是动态模块',
      age: 19,
    }),
    TheMiddlewareModule,
    TheUploadModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zengxpang',
      database: 'refresh_token_test',
      synchronize: true,
      logging: true,
      entities: [User],
      poolSize: 10,
      connectorPackage: 'mysql2',
    }),
    JwtModule.register({
      global: true,
      secret: 'zxp',
      signOptions: {
        expiresIn: '30m',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
