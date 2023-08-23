import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { RequiredLogin } from '../custom/requiredLogin.decorator';
import { RequiredPermission } from '../custom/requiredPermission.decorator';

@Controller('bbb')
@RequiredLogin()
export class BbbController {
  constructor(private readonly bbbService: BbbService) {}

  @Post()
  @RequiredPermission('新增 bbb')
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }

  @Get()
  @RequiredPermission('查询 bbb')
  findAll() {
    return this.bbbService.findAll();
  }

  @Get(':id')
  @RequiredPermission('查询 bbb')
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id);
  }

  @Patch(':id')
  @RequiredPermission('修改 bbb')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  @RequiredPermission('删除 bbb')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }
}
