import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { IsBooleanDefault, IsDateDefault, IsStringDefault } from '../../infrastructure/utils/class-validator-decorators';

export class ApiMessageResponse {
  @Type(() => String)
  @IsStringDefault()
  @ApiProperty({ description: 'Идентификатор диалога', type: 'string', example: '3ef7ae8b-bc7d-486d-ab70-bde4ede0a146' })
  dialogId: string;

  @Type(() => String)
  @IsStringDefault()
  @ApiProperty({ description: 'Идентификатор', type: 'string', example: '8adb2d02-d92a-48eb-8d12-e90c71e0440f' })
  id: string;

  @IsOptional()
  @Type(() => Date)
  @IsDateDefault
  @ApiPropertyOptional({ description: 'Дата создания', type: Date, example: '2025-11-03 17:29:14' })
  createdAt?: Date;

  @Type(() => String)
  @IsStringDefault()
  @ApiProperty({ description: 'Роль отправителя', type: 'string', example: 'clinic' })
  senderRole: string;

  @Type(() => String)
  @IsStringDefault()
  @ApiProperty({ description: 'Направление', type: 'string', example: 'inbound' })
  direction: string;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({ description: 'Строка поставщика', type: 'string' })
  providerRaw?: string;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({
    description: 'Строка тела',
    type: 'string',
    example: 'Добрый день. Предоставьте мне консультцию, пожалуйста',
  })
  bodyRaw?: string;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({
    description: 'Основное тело',
    type: 'string',
    example: 'Добрый день. Предоставьте мне консультцию, пожалуйста',
  })
  bodyMain?: string;

  @Type(() => Boolean)
  @IsBooleanDefault
  @ApiProperty({
    description: 'Наличие футера',
    type: 'boolean',
    example: true,
  })
  hasFooter: boolean;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({
    description: 'Строка футера',
    type: 'string',
  })
  footerRaw?: string;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({
    description: 'Проанализированный футер',
    type: 'string',
  })
  footerParsed?: string;

  @Type(() => Boolean)
  @IsBooleanDefault
  @ApiProperty({
    description: 'Факт генерации сообщения искуственным интеллектом',
    type: 'boolean',
    example: true,
  })
  generatedAi: boolean;
}
