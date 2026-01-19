import { ApiProperty } from '@nestjs/swagger';

import { PaginationWrapperResponse } from '../../infrastructure/models/pagination/pagination-wrapper.response';
import { IsArrayDefault, ValidateNestedDefault } from '../../infrastructure/utils/class-validator-decorators';
import { ApiConsentResponse } from './api.consent.response';

export class ApiConsentsListResponse extends PaginationWrapperResponse<ApiConsentResponse> {
  @ValidateNestedDefault()
  @IsArrayDefault
  @ApiProperty({
    type: [ApiConsentResponse],
  })
  items: ApiConsentResponse[];

  constructor({ items, ...pagination }: ApiConsentsListResponse) {
    super(pagination);
    this.items = items;
  }
}
