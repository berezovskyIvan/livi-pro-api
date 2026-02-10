import { ApiProperty } from '@nestjs/swagger';

import { IsEmailDefault, IsEnumDefault } from '../../infrastructure/utils/class-validator-decorators';
import { Utils } from '../../infrastructure/utils/utils';
import { ApplicationType } from '../interfaces';

export class ApiSendApplicationPayload {
  @IsEnumDefault(ApplicationType)
  @ApiProperty({
    enum: Utils.extractEnumValues(ApplicationType),
    description: 'Тип заявки',
    example: ApplicationType.CallQualityControl,
  })
  applicationType: ApplicationType;

  @IsEmailDefault
  @ApiProperty({
    type: 'string',
    description: 'Электронная почта',
    example: 'help@livi-pro.ru',
  })
  email: string;
}
