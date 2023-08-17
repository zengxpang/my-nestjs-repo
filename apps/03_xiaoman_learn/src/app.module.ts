import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { ConfigModule } from './config/config.module';
import { DynamicModuleModule } from './dynamic-module/dynamic-module.module';

@Module({
  imports: [
    PersonModule,
    ConfigModule,
    DynamicModuleModule.register({
      name: '我是动态模块',
      age: 19,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
