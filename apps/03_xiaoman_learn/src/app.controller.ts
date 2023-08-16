import { Body, Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import * as svgCaptcha from 'svg-captcha';

@Controller({
  version: '1',
  path: 'app',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // find(@Request() req) {
  //   return {
  //     code: 200,
  //   };
  // }

  // @Get('test')
  // find(@Query() query) {
  //   return {
  //     code: 200,
  //   };
  // }

  // @Get(':id')
  // findId(@Request() req) {
  //   return {
  //     code: 200,
  //   };
  // }

  // @Get(':id')
  // findId(@Param() params) {
  //   return {
  //     code: 200,
  //   };
  // }

  // @Get(':id')
  // @HttpCode(500)
  // findId(@Headers() headers) {
  //   return {
  //     code: 200,
  //   };
  // }

  // @Post()
  // create(@Request() req) {
  //   return {
  //     code: 200,
  //   };
  // }

  // @Post()
  // create(@Body('name') body) {
  //   return {
  //     code: 200,
  //   };
  // }

  @Get('captcha')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.createMathExpr({
      size: 4,
      fontSize: 30,
      width: 100,
      height: 30,
      background: '#cc9966',
    });
    req.session.captcha = captcha.text; // 存在 session 中，用于登录验证
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('login')
  login(@Body() body, @Session() session) {
    const { username, password, captcha } = body;
    if (captcha.toLowerCase() !== session.captcha.toLowerCase()) {
      return {
        code: 400,
        msg: '验证码错误',
      };
    } else {
      return {
        code: 200,
        msg: '登录成功',
      };
    }
  }
}
