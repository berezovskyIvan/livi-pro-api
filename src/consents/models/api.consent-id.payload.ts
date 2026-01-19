import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsIntDefault } from '../../infrastructure/utils/class-validator-decorators';

export class ApiConsentIdPayload {
  @Type(() => Number)
  @IsIntDefault
  @ApiProperty({ description: 'Идентификатор согласия', type: 'integer', example: 2 })
  consentId: number;
}
