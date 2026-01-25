import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsStringDefault } from '../../infrastructure/utils/class-validator-decorators';

export class ApiUserResponse {
  @Type(() => String)
  @IsStringDefault()
  @ApiProperty({ description: 'Идентификатор пользователя', type: 'string', example: '3ef7ae8b-bc7d-486d-ab70-bde4ede0a146' })
  id: string;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({
    description: 'Телефон пользователя',
    type: 'string',
  })
  phone?: string;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({
    description: 'Имя пользователя',
    type: 'string',
  })
  firstName?: string;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({
    description: 'Отчество пользователя',
    type: 'string',
  })
  middleName?: string;

  @IsOptional()
  @Type(() => String)
  @IsStringDefault()
  @ApiPropertyOptional({
    description: 'Фамилия пользователя',
    type: 'string',
  })
  lastName?: string;
}
