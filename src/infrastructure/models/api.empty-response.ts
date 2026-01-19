import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsBooleanDefault } from '../utils/class-validator-decorators';

export class ApiEmptyResponse {
  @IsBooleanDefault
  @ApiProperty({
    description: 'Пустой объект для запросов, не нуждающихся в ответе с данными',
    default: true,
    example: true,
    type: 'boolean',
  })
  ok: boolean;

  constructor(ok = true) {
    this.ok = ok;
  }

  static false() {
    const response = new ApiEmptyResponse();
    response.ok = false;
    return response;
  }

  static true() {
    return new ApiEmptyResponse();
  }
}
