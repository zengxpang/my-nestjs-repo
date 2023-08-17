import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Next,
  Response,
} from '@nestjs/common';
import { TheMiddlewareService } from './the-middleware.service';
import { CreateTheMiddlewareDto } from './dto/create-the-middleware.dto';
import { UpdateTheMiddlewareDto } from './dto/update-the-middleware.dto';

@Controller({
  version: '1',
  path: 'the-middleware',
})
export class TheMiddlewareController {
  constructor(private readonly theMiddlewareService: TheMiddlewareService) {}

  @Get('next')
  a1(
    @Next() next,
    // @Response({
    //   passthrough: true,
    // })
    // res,
  ) {
    console.log('next', next);
    next();
    return 'next';
  }

  @Get('next')
  a2() {
    return 'result';
  }

  @Post()
  create(@Body() createTheMiddlewareDto: CreateTheMiddlewareDto) {
    return this.theMiddlewareService.create(createTheMiddlewareDto);
  }

  @Get()
  findAll() {
    return this.theMiddlewareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.theMiddlewareService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTheMiddlewareDto: UpdateTheMiddlewareDto,
  ) {
    return this.theMiddlewareService.update(+id, updateTheMiddlewareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.theMiddlewareService.remove(+id);
  }
}
