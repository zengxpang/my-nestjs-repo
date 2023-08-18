import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  FileValidator,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TheUploadService } from './the-upload.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './storage';
import { FileSizeValidationPipe } from './file-size-validation.pipe';
import { MyFileValidator } from './myFileValidator';

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
  @UseInterceptors(
    FilesInterceptor('xxx', 3, {
      dest: 'uploads',
    }),
  )
  upload2(
    @UploadedFiles(
      new ParseFilePipe({
        // exceptionFactory: (errors) => {
        //   throw new HttpException('文件大小超过10k', HttpStatus.BAD_REQUEST);
        // },
        validators: [
          // 1 内置验证器
          // new MaxFileSizeValidator({
          //   maxSize: 10 * 1024,
          // }),
          // new FileTypeValidator({
          //   fileType: 'image/jpeg',
          // }),

          // 2 自定义验证器
          new MyFileValidator({}),
        ],
      }),
    )
    files: Express.Multer.File,
  ) {
    console.log(files);
  }

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
  // @UseInterceptors(
  //   AnyFilesInterceptor({
  //     // dest: 'uploads'
  //     storage,
  //   }),
  // )
  // uploadAnyFiles(
  //   @UploadedFiles(FileSizeValidationPipe) files: Array<Express.Multer.File>,
  //   @Body() body,
  // ) {
  //   console.log('body', body);
  //   console.log('files', files);
  // }
}