import { ApiProperty } from '@nestjs/swagger';

import { PaginationWrapperResponse } from '../../infrastructure/models/pagination/pagination-wrapper.response';
import { IsArrayDefault, ValidateNestedDefault } from '../../infrastructure/utils/class-validator-decorators';
import { ApiMessageResponse } from './api.message.response';

export class ApiMessagesListResponse extends PaginationWrapperResponse<ApiMessageResponse> {
  @ValidateNestedDefault()
  @IsArrayDefault
  @ApiProperty({
    type: [ApiMessageResponse],
  })
  items: ApiMessageResponse[];

  constructor({ items, ...pagination }: ApiMessagesListResponse) {
    super(pagination);
    this.items = items;
  }
}
