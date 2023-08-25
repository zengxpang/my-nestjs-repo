import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { SessionService } from './session/session.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(SessionService)
  private readonly sessionService: SessionService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('count')
  async count(
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const sid = req.cookies?.sid;
    // <{count:string}>理由: redis 虽然可以存整数、浮点数，但是它会转为 string 来存，所以取到的是 string
    const session = await this.sessionService.getSession<{
      count: string;
    }>(sid);

    const currCount = session.count ? parseInt(session.count) + 1 : 1;
    const currSid = await this.sessionService.setSession(sid, {
      count: currCount,
    });
    res.cookie('sid', currSid, { maxAge: 30 * 60 * 1000 });
    return currCount;
  }
}
