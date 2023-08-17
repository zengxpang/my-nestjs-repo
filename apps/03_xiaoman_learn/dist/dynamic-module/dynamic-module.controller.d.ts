import { DynamicModuleService } from './dynamic-module.service';
import { CreateDynamicModuleDto } from './dto/create-dynamic-module.dto';
import { UpdateDynamicModuleDto } from './dto/update-dynamic-module.dto';
export declare class DynamicModuleController {
    private readonly dynamicModuleService;
    private readonly configOptions;
    constructor(dynamicModuleService: DynamicModuleService, configOptions: Record<string, any>);
    create(createDynamicModuleDto: CreateDynamicModuleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDynamicModuleDto: UpdateDynamicModuleDto): string;
    remove(id: string): string;
}
