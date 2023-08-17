import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
export declare class AppController {
    private readonly appService;
    private readonly configService;
    constructor(appService: AppService, configService: ConfigService);
    find(query: any): {
        code: number;
        data: string;
    };
    createCaptcha(req: any, res: any): void;
    login(body: any, session: any): {
        code: number;
        msg: string;
    };
}
