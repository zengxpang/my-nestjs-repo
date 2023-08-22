import {
  Controller,
  Get,
  Inject,
  Res,
  Session,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller()
export class AppController {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sss')
  getSession(@Session() session): number {
    console.log(session.id);
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  @Get('ttt')
  getToken(
    @Headers('authorization') authorization: string,
    @Res({
      passthrough: true,
    })
    res: Response,
  ): number {
    console.log(authorization);
    if (!authorization) {
      const newToken = this.jwtService.sign({ count: 1 });
      res.setHeader('token', newToken);
      return 1;
    } else {
      try {
        //Bearer <token>
        const token = authorization.split(' ')[1];
        console.log(token);
        const data = this.jwtService.verify(token);
        const newToken = this.jwtService.sign({ count: data.count + 1 });
        res.setHeader('token', newToken);
        return data.count + 1;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }
    }
  }
}
