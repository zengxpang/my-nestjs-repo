import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ConfigService } from '../config/config.service';
export declare class PersonController {
    private readonly personService;
    private readonly zxp2;
    private readonly zxp3;
    private readonly async;
    private readonly configService;
    constructor(personService: PersonService, zxp2: string[], zxp3: string, async: string, configService: ConfigService);
    create(createPersonDto: CreatePersonDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePersonDto: UpdatePersonDto): string;
    remove(id: string): string;
}
