import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { IsBooleanDefault, IsDateDefault, IsIntDefault, IsStringDefault } from '../../infrastructure/utils/class-validator-decorators';

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

  @Type(() => String)
  @IsStringDefault()
  @ApiProperty({ description: 'Идентификатор пользователя', type: 'string', example: '8a2c630e-e9a8-4283-a61f-7b0e83148b59' })
  userId: string;
}
