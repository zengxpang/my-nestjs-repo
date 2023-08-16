/// <reference types="multer" />
import { AppService } from './app.service';
import { CreatePersonDto } from './dto/create-person.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    query(name: string, age: number): string;
    urlParam(id: string): string;
    body(body: CreatePersonDto): string;
    body2(createPerson: CreatePersonDto, files: Array<Express.Multer.File>): number;
}
