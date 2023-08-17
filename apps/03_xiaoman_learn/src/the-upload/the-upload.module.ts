import { Module } from '@nestjs/common';
import { TheUploadService } from './the-upload.service';
import { TheUploadController } from './the-upload.controller';

@Module({
  controllers: [TheUploadController],
  providers: [TheUploadService]
})
export class TheUploadModule {}
