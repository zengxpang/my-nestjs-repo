import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { ConfigModule } from './config/config.module';
import { DynamicModuleModule } from './dynamic-module/dynamic-module.module';
import { TheMiddlewareModule } from './the-middleware/the-middleware.module';
import { TheUploadModule } from './the-upload/the-upload.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
