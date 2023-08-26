import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager;

  async findUserByEmail(email: string) {
    return await this.entityManager.findOneBy('User', { email });
  }
}
