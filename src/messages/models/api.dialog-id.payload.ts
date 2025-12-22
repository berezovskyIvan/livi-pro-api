import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsStringDefault } from '../../infrastructure/utils/class-validator-decorators';

export class ApiDialogIdPayload {
  @Type(() => String)
  @IsStringDefault()
  @ApiProperty({ description: 'Идентификатор диалога', type: 'string', example: '1d6421d3-c4ff-4a42-99be-b2211acc02d1' })
  dialogId: string;
}
