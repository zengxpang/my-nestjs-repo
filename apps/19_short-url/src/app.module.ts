import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueCode } from './entity/UniqueCode';
import { UniqueCodeService } from './unique-code.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ShortMapLong } from './entity/ShortMapLong';
import { ShortMapLongService } from './short-map-long.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zengxpang',
      database: 'shortUrl_test',
      synchronize: true,
      logging: true,
      entities: [UniqueCode, ShortMapLong],
      poolSize: 10,
      connectorPackage: 'mysql2',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UniqueCodeService, ShortMapLongService],
})
export class AppModule {}
