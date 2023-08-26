import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
  BadRequestException,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { CompressService } from './compress.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { existsSync } from 'fs';
import * as sharp from 'sharp';
import { Response } from 'express';

@Controller('compress')
export class CompressController {
  constructor(private readonly compressService: CompressService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }

  @Get('compress')
  async compress(
    @Query('filePath') filePath: string,
    @Query('colours', ParseIntPipe) colours: number,
    @Res() res: Response,
  ) {
    if (!existsSync(filePath)) {
      throw new BadRequestException('文件不存在');
    }
    const data = await sharp(filePath, {
      animated: true,
      limitInputPixels: false,
    })
      .gif({
        colours,
      })
      .toBuffer();

    res.setHeader('Content-Disposition', `attachment; filename="dest.gif"`);
    res.send(data);
  }
}
