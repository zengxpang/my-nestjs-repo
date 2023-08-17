import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';
import { CreateDynamicModuleDto } from './dto/create-dynamic-module.dto';
import { UpdateDynamicModuleDto } from './dto/update-dynamic-module.dto';

@Controller({
  version: '1',
  path: 'dynamic-module',
})
export class DynamicModuleController {
  constructor(
    private readonly dynamicModuleService: DynamicModuleService,
    @Inject('CONFIG_OPTIONS')
    private readonly configOptions: Record<string, any>,
  ) {}

  @Post()
  create(@Body() createDynamicModuleDto: CreateDynamicModuleDto) {
    return this.dynamicModuleService.create(createDynamicModuleDto);
  }

  @Get()
  findAll() {
    console.log('configOptions', this.configOptions);
    return this.dynamicModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dynamicModuleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDynamicModuleDto: UpdateDynamicModuleDto,
  ) {
    return this.dynamicModuleService.update(+id, updateDynamicModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dynamicModuleService.remove(+id);
  }
}
