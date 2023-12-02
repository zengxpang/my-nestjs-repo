import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { generateRandomStr } from '../utils';
import { UniqueCode } from './entity/UniqueCode';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UniqueCodeService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  // @Cron(CronExpression.EVERY_5_SECONDS)
  async generateCode() {
    const str = generateRandomStr(6);
    const uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      code: str,
    });
    if (uniqueCode) {
      // 数据库中已经有该短链了，就重新生成，防止重复(递归)
      return this.generateCode();
    } else {
      const code = new UniqueCode();
      code.code = str;
      return await this.entityManager.insert(UniqueCode, code);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async batchGenerateCode() {
    for (let i = 0; i < 20; i++) {
      await this.generateCode();
    }
  }
}
