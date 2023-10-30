import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Headers,
} from '@nestjs/common';
import { AppService } from './app.service';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import { JwtService } from '@nestjs/jwt';

// no-scan 未扫描
// scan-wait-confirm -已扫描，等待用户确认
// scan-confirm 已扫描，用户同意授权
// scan-cancel 已扫描，用户取消授权
// expired 已过期

interface QrCodeInfo {
  status:
    | 'no-scan'
    | 'scan-wait-confirm'
    | 'scan-confirm'
    | 'scan-cancel'
    | 'expired';
  userInfo?: {
    userId: number;
  };
}
const theMap = new Map<string, QrCodeInfo>();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject()
  private readonly jwtService: JwtService;

  private users = [
    {
      id: 1,
      username: 'admin',
      password: '123456',
    },
    {
      id: 2,
      username: 'user',
      password: '123456',
    },
  ];

  @Get('login')
  async login(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    const user = this.users.find((user) => user.username === username);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    if (user.password !== password) {
      throw new BadRequestException('密码错误');
    }

    return {
      token: this.jwtService.sign({
        userId: user.id,
      }),
    };
  }

  @Get('userInfo')
  async userInfo(@Headers('Auth') auth: string) {
    try {
      const userInfo = this.jwtService.verify(auth);
      return this.users.find((item) => item.id === userInfo.userId);
    } catch (e) {
      throw new BadRequestException('token过期,请重新登录');
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('create')
  async create() {
    const uuid = randomUUID();
    const dataUrl = await qrcode.toDataURL(
      `http://192.168.2.37:3000/pages/comfirm.html?id=${uuid}`,
    );

    theMap.set(`qrcode_${uuid}`, {
      status: 'no-scan',
    });

    return {
      qrcode_id: uuid,
      img: dataUrl,
    };
  }

  @Get('check')
  async check(@Query('id') id: string) {
    const info = theMap.get(`qrcode_${id}`);
    // if (!info) {
    //   throw new BadRequestException('二维码已过期');
    // }
    if (info.status === 'scan-confirm') {
      return {
        token: this.jwtService.sign({
          userId: info.userInfo.userId,
        }),
        ...info,
      };
    }
    return info;
  }

  @Get('confirm')
  async confirm(@Query('id') id: string, @Headers('Auth') auth: string) {
    let user;
    try {
      const userInfo = this.jwtService.verify(auth);
      user = this.users.find((item) => item.id === userInfo.userId);
    } catch (e) {
      throw new BadRequestException('token过期,请重新登录');
    }
    const info = theMap.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-confirm';
    info.userInfo = user;
    return 'success';
  }

  @Get('cancel')
  async cancel(@Query('id') id: string) {
    const info = theMap.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-cancel';
    return 'success';
  }

  @Get('scan')
  async scan(@Query('id') id: string) {
    const info = theMap.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-wait-confirm';
    return 'success';
  }
}
