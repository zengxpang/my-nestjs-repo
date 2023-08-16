import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createCaptcha(req: any, res: any): void;
    login(body: any, session: any): {
        code: number;
        msg: string;
    };
}
