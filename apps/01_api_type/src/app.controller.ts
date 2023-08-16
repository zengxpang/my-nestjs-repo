import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CccDto } from './dto/ccc.dto';
import { CccVo } from './vo/ccc.vo';

@ApiTags('xxx')
@Controller('xxx')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('xxx-get')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth('bearer')
  @ApiTags('xxx-get')
  @ApiOperation({ summary: '测试aaa', description: 'aaa描述' })
  @ApiResponse({ status: HttpStatus.OK, description: 'aaa成功', type: String })
  @ApiQuery({
    name: 'a1',
    type: String,
    description: 'a1 params',
    required: false,
    example: '111',
  })
  @ApiQuery({
    name: 'a2',
    type: String,
    description: 'a2 params',
    required: true,
    example: '222',
  })
  @Get('aaa')
  aaa(@Query('a1') a1, @Query('a2') a2) {
    console.log(a1, a2);
    return `aaa success,a1=${a1},a2=${a2}`;
  }

  @ApiCookieAuth('cookie')
  @ApiTags('xxx-get')
  @ApiOperation({ summary: '测试bbb', description: 'bbb描述' })
  @ApiResponse({ status: HttpStatus.OK, description: 'bbb成功', type: String })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'id不合法' })
  @ApiParam({
    name: 'id',
    description: 'id params',
    required: true,
    example: '111',
    type: String,
  })
  @Get('bbb/:id')
  bbb(@Param('id') id: string) {
    return `bbb success ${id}`;
  }

  /*
    dto 是 data transfer object，用于参数的接收。
    vo 是 view object，用于返回给视图的数据的封装。
    而 entity 是和数据库表对应的实体类。
 */
  @ApiBasicAuth('basic')
  @ApiTags('xxx-post')
  @ApiOperation({ summary: '测试ccc', description: 'ccc描述' })
  @ApiResponse({ status: HttpStatus.OK, description: 'ccc成功', type: CccVo })
  @ApiBody({ type: CccDto })
  @Post('ccc')
  ccc(@Body('ccc') ccc: CccDto) {
    const vo = new CccVo();
    vo.aaa = 111;
    vo.bbb = 222;
    return vo;
  }
}
