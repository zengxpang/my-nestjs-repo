import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShortMapLong {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 10,
    comment: '压缩码',
  })
  shorUrl: string;

  @Column({
    length: 200,
    comment: '原始URL',
  })
  longUrl: string;

  @CreateDateColumn()
  createTime: Date;
}
