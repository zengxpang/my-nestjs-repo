import { Injectable } from '@nestjs/common';
import { CreateTheUploadDto } from './dto/create-the-upload.dto';
import { UpdateTheUploadDto } from './dto/update-the-upload.dto';

@Injectable()
export class TheUploadService {
  create(createTheUploadDto: CreateTheUploadDto) {
    return 'This action adds a new theUpload';
  }

  findAll() {
    return `This action returns all theUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} theUpload`;
  }

  update(id: number, updateTheUploadDto: UpdateTheUploadDto) {
    return `This action updates a #${id} theUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} theUpload`;
  }
}
