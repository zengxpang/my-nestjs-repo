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
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ConfigService } from '../config/config.service';

@Controller({
  version: '1',
  path: 'person',
})
export class PersonController {
  // constructor(private readonly personService: PersonService) {}
  constructor(
    @Inject('zxp') private readonly personService: PersonService,
    @Inject('zxp2') private readonly zxp2: string[],
    @Inject('zxp3') private readonly zxp3: string,
    @Inject('async') private readonly async: string,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.configService.create('xxx');
    // return this.personService.findAll() + this.zxp2 + this.zxp3 + this.async;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
