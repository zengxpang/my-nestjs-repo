import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CccDto {
  @ApiProperty({
    name: 'aaa',
    enum: ['a1', 'a2', 'a3'],
    required: true,
    minLength: 2,
    maxLength: 20,
  })
  aaa: string;

  @ApiPropertyOptional({
    name: 'bbb',
    minimum: 40,
    maximum: 50,
    default: 45,
    example: 40,
  })
  bbb: number;

  @ApiProperty({ name: 'ccc' })
  ccc: Array<string>;
}
