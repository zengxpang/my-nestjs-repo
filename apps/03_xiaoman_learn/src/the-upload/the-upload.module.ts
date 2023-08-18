import { Module } from '@nestjs/common';
import { TheUploadService } from './the-upload.service';
import { TheUploadController } from './the-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path'; // extname 获取文件后缀名

@Module({
  // imports: [
  //   MulterModule.register({
  //     storage: diskStorage({
  //       destination: join(__dirname, '../images'),
  //       filename(
  //         req: Express.Request,
  //         file: Express.Multer.File,
  //         callback: (error: Error | null, filename: string) => void,
  //       ) {
  //         console.log(req);
  //         console.log(file);
  //         const fileName = `${
  //           new Date().getTime() + extname(file.originalname)
  //         }`;
  //         // console.log(__dirname); //    dist/the-upload
  //         callback(null, fileName);
  //       },
  //     }),
  //   }),
  // ],
  controllers: [TheUploadController],
  providers: [TheUploadService],
})
export class TheUploadModule {}
