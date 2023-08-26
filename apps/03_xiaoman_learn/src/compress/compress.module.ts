import { Module } from '@nestjs/common';
import { CompressService } from './compress.service';
import { CompressController } from './compress.controller';

@Module({
  controllers: [CompressController],
  providers: [CompressService],
})
export class CompressModule {}
