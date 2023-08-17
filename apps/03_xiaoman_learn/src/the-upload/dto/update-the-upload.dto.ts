import { PartialType } from '@nestjs/mapped-types';
import { CreateTheUploadDto } from './create-the-upload.dto';

export class UpdateTheUploadDto extends PartialType(CreateTheUploadDto) {}
