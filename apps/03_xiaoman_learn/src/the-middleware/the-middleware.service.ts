import { Injectable } from '@nestjs/common';
import { CreateTheMiddlewareDto } from './dto/create-the-middleware.dto';
import { UpdateTheMiddlewareDto } from './dto/update-the-middleware.dto';

@Injectable()
export class TheMiddlewareService {
  create(createTheMiddlewareDto: CreateTheMiddlewareDto) {
    return 'This action adds a new theMiddleware';
  }

  findAll() {
    return `hello theMiddleware`;
  }

  findOne(id: number) {
    return `This action returns a #${id} theMiddleware`;
  }

  update(id: number, updateTheMiddlewareDto: UpdateTheMiddlewareDto) {
    return `This action updates a #${id} theMiddleware`;
  }

  remove(id: number) {
    return `This action removes a #${id} theMiddleware`;
  }
}
