import { AppService } from './app.service';
import { CccDto } from './dto/ccc.dto';
import { CccVo } from './vo/ccc.vo';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    aaa(a1: any, a2: any): string;
    bbb(id: string): string;
    ccc(ccc: CccDto): CccVo;
}
