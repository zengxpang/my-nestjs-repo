import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  controllers: [PersonController],
  providers: [
    {
      provide: 'zxp',
      useClass: PersonService,
    },
    {
      provide: 'zxp2',
      useValue: ['A', 'B', 'C', 'D', 'E'],
    },
    // 服务之间互相有依赖可以用工厂模式
    {
      provide: 'zxp3',
      inject: ['zxp2'],
      useFactory: (zxp2: string[]) => {
        return zxp2.join(',');
      },
    },
    // 异步模式, 用useFactory返回一个promise或者其他异步操作
    {
      provide: 'async',
      useFactory: async () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('async');
          }, 1000);
        });
      },
    },
  ],
})
export class PersonModule {}
