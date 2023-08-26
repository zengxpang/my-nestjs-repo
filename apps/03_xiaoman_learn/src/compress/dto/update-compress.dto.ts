import { PartialType } from '@nestjs/mapped-types';
import { CreateCompressDto } from './create-compress.dto';

export class UpdateCompressDto extends PartialType(CreateCompressDto) {}
