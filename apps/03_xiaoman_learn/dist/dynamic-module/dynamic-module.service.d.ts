import { CreateDynamicModuleDto } from './dto/create-dynamic-module.dto';
import { UpdateDynamicModuleDto } from './dto/update-dynamic-module.dto';
export declare class DynamicModuleService {
    create(createDynamicModuleDto: CreateDynamicModuleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDynamicModuleDto: UpdateDynamicModuleDto): string;
    remove(id: number): string;
}
