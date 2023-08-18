import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  UploadedFiles,
} from '@nestjs/common';
import { TheUploadService } from './the-upload.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './storage';

@Controller('the-upload')
export class TheUploadController {
  constructor(private readonly theUploadService: TheUploadService) {}

  @Get()
  getHello(): string {
    return 'hello world';
  }

  // 单文件上传
  @Post('album')
  @UseInterceptors(
    FileInterceptor('album', {
      dest: 'uploads',
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // console.log(body);
  }

  // 多文件上传
  @Post('album2')
  // 文件名单个字段
  // @UseInterceptors(
  //   FilesInterceptor('album2', 3, {
  //     dest: 'uploads',
  //   }),
  // )
  // upload2(@UploadedFiles() files: Express.Multer.File) {
  //   console.log(files);
  // }

  // 文件名多个字段
  // @UseInterceptors(
  //   FileFieldsInterceptor(
  //     [
  //       { name: 'aaa', maxCount: 1 },
  //       { name: 'bbb', maxCount: 3 },
  //     ],
  //     {
  //       dest: 'uploads',
  //     },
  //   ),
  // )
  // upload2(@UploadedFiles() files: Express.Multer.File) {
  //   console.log(files);
  // }

  // ----
  // 文件名任意字段
  @UseInterceptors(
    AnyFilesInterceptor({
      // dest: 'uploads'
      storage,
    }),
  )
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    // console.log('body', body);
    // console.log('files', files);
  }
}
