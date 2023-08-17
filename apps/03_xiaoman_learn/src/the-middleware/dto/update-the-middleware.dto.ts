import { PartialType } from '@nestjs/mapped-types';
import { CreateTheMiddlewareDto } from './create-the-middleware.dto';

export class UpdateTheMiddlewareDto extends PartialType(CreateTheMiddlewareDto) {}
