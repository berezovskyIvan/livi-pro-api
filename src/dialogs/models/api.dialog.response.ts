import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { IsDateDefault, IsStringDefault, ValidateNestedDefault } from '../../infrastructure/utils/class-validator-decorators';
import { ApiDialogLastMessageResponse } from './api.dialog-last-message.response';

export class ApiDialogResponse {
  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({ description: 'Идентификатор канала', type: 'string', example: '2' })
  channelId?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDateDefault
  @ApiPropertyOptional({ description: 'Дата создания', type: Date, example: '2025-11-03 12:00:00' })
  createdAt?: Date;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({ description: 'Состояние модели', type: 'string', example: '1' })
  fsmState?: string;

  @Type(() => String)
  @IsStringDefault()
  @ApiProperty({ description: 'Идентификатор диалога', type: 'string', example: '3ef7ae8b-bc7d-486d-ab70-bde4ede0a146' })
  id: string;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({ description: 'Идентификатор оператора', type: 'string', example: '1' })
  operatorId?: string;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({ description: 'Ключ сессии', type: 'string', example: '2_d827517d-699e-46d2-9682-0dd822df2a85' })
  sessionKey?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDateDefault
  @ApiPropertyOptional({ description: 'Дата обновления', type: Date, example: '2025-11-04 12:00:00' })
  updatedAt?: Date;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({ description: 'Идентификатор пользователя', type: 'string', example: '8a2c630e-e9a8-4283-a61f-7b0e83148b59' })
  userId?: string;

  @ValidateNestedDefault()
  @ApiProperty({
    description: 'Информация о последнем сообщении',
    type: ApiDialogLastMessageResponse,
  })
  lastMessage: ApiDialogLastMessageResponse;
}
