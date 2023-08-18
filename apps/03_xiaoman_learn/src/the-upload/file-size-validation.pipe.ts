import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Express } from 'express';

// 自定义文件大小验证管道。Nest有内置的文件常见的pipe（包括验证大小、类型等），这里只是练习自定义管道
@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Array<Express.Multer.File>, metadata: ArgumentMetadata) {
    const sizeArr = value.map((item) => item.size);
    const hasExceed = sizeArr.some((item) => item > 10 * 1024);
    if (hasExceed) {
      throw new HttpException('包含大于10k的文件', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
