import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UniqueCodeService } from './unique-code.service';
import { ShortMapLongService } from './short-map-long.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly uniqueCodeService: UniqueCodeService,
    private readonly shortMapLongService: ShortMapLongService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('generateShortUrl')
  async generateShortUrl(@Query('url') longUrl) {
    return await this.shortMapLongService.generate(longUrl);
  }

  @Get(':code')
  @Redirect()
  async jump(@Param('code') code) {
    const longUrl = await this.shortMapLongService.getLongUrl(code);
    if (!longUrl) {
      throw new BadRequestException('短链不存在');
    }
    return {
      url: longUrl,
      statusCode: 302,
    };
  }
}
