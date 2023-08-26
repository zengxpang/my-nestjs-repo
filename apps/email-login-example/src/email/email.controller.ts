import { Controller, Get, Inject, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisService } from 'src/redis/redis.service';

@Controller('email')
export class EmailController {
  @Inject(RedisService)
  private readonly redisService: RedisService;

  constructor(private readonly emailService: EmailService) {}
  @Get('code')
  async sendEmailCode(@Query('address') address) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${address}`, code, 60 * 5); // 过期时间为 5 分钟

    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<p>你的登录验证码是: ${code}</p>
      <p>验证码五分钟之后过期</p>`,
    });
    return '发送成功';
  }
}
