import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number): string {
    return `Hello ${name} ${age}`;
  }

  @Get(':id')
  urlParam(@Param('id') id: string): string {
    return `Hello ${id}`;
  }

  @Post('create')
  body(@Body() body: CreatePersonDto): string {
    return `create ${body.name} ${body.age}`;
  }

  @Post('file')
  // @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads',
    }),
  )
  body2(
    @Body() createPerson: CreatePersonDto,
    // @UploadedFile() file: Express.Multer.File,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return 1211;
    // return `received:3432 ${JSON.stringify(createPerson)}`;
  }
}
