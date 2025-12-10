import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsIntDefault, MinDefault } from '../../utils/class-validator-decorators';

export class PaginationPayload {
  @Type(() => Number)
  @IsIntDefault
  @MinDefault(1)
  @ApiProperty({ description: 'Номер страницы', type: 'integer', example: 1 })
  page: number;

  @Type(() => Number)
  @IsIntDefault
  @MinDefault(1)
  @ApiProperty({ description: 'Количество элементов на странице', type: 'integer', example: 10 })
  perPage: number;
}
