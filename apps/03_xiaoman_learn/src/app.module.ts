import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [PersonModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
