import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UniqueCodeService } from './unique-code.service';
import { UniqueCode } from './entity/UniqueCode';
import { ShortMapLong } from './entity/ShortMapLong';

@Injectable()
export class ShortMapLongService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  @Inject(UniqueCodeService)
  private readonly uniqueCodeService: UniqueCodeService;

  async generate(longUrl: string) {
    let uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      status: 0,
    });

    if (!uniqueCode) {
      uniqueCode = await this.uniqueCodeService.generateCode();
    }

    const map = new ShortMapLong();
    map.shorUrl = uniqueCode.code;
    map.longUrl = longUrl;

    await this.entityManager.insert(ShortMapLong, map);
    await this.entityManager.update(
      UniqueCode,
      {
        id: uniqueCode.id,
      },
      {
        status: 1,
      },
    );
    return uniqueCode.code;
  }

  async getLongUrl(code: string) {
    const map = await this.entityManager.findOneBy(ShortMapLong, {
      shorUrl: code,
    });
    if (!map) {
      return null;
    }
    return map.longUrl;
  }
}
