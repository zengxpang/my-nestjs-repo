import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { RequiredLogin } from '../custom/requiredLogin.decorator';
import { RequiredPermission } from '../custom/requiredPermission.decorator';

@Controller('aaa')
@RequiredLogin()
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Post()
  @RequiredPermission('新增 aaa')
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  @RequiredPermission('查询 aaa')
  findAll() {
    return this.aaaService.findAll();
  }

  @Get(':id')
  @RequiredPermission('查询 aaa')
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  @RequiredPermission('修改 aaa')
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  @RequiredPermission('删除 aaa')
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}
