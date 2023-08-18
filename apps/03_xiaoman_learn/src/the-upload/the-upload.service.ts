import { Injectable } from '@nestjs/common';
import { CreateTheUploadDto } from './dto/create-the-upload.dto';
import { UpdateTheUploadDto } from './dto/update-the-upload.dto';

import * as path from 'path';
import { zip } from 'compressing';

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

  async stream() {
    const url = path.join(
      process.cwd(),
      'my-uploads/xxx-1692325592757-137890621-21201679990994_.pic.jpg',
    );
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    return tarStream;
  }
}
