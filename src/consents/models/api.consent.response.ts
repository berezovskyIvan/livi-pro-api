import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import {
  IsBooleanDefault,
  IsDateDefault,
  IsIntDefault,
  ValidateNestedDefault,
} from '../../infrastructure/utils/class-validator-decorators';
import { ApiUserResponse } from '../../user/models/api.user.response';

export class ApiConsentResponse {
  @Type(() => Boolean)
  @IsBooleanDefault
  @ApiProperty({ description: 'Наличие действующего согласия', type: 'boolean', example: false })
  consent: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDateDefault
  @ApiPropertyOptional({ description: 'Дата создания согласия', type: Date, example: '2025-11-03 12:00:00' })
  createdAt?: Date;

  @Type(() => Number)
  @IsIntDefault
  @ApiProperty({ description: 'Идентификатор согласия', type: 'integer', example: 2 })
  id: number;

  @Type(() => Number)
  @IsIntDefault
  @ApiProperty({ description: 'Идентификатор текста', type: 'integer', example: 2 })
  textId: number;

  @ValidateNestedDefault()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Информация о пользователе',
    type: 'string',
  })
  user?: ApiUserResponse;
}
