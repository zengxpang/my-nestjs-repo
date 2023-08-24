import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  UseGuards,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginGuard } from '../login.guard';

@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  constructor(private readonly userService: UserService) {}

  @Get('test')
  @UseGuards(LoginGuard)
  test() {
    return 'test';
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    const access_token = this.jwtService.sign(
      {
        username: user.username,
        userId: user.id,
      },
      {
        expiresIn: '30m',
      },
    );
    const refresh_token = this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn: '7d',
      },
    );
    return {
      access_token,
      refresh_token,
    };
  }

  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.refreshToken(data.userId);
      const access_token = this.jwtService.sign(
        {
          username: user.username,
          userId: user.id,
        },
        {
          expiresIn: '30m',
        },
      );
      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: '7d',
        },
      );
      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new UnauthorizedException('token过期，请重新登录');
    }
  }
}
