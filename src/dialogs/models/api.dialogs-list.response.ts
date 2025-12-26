import { ApiProperty } from '@nestjs/swagger';

import { PaginationWrapperResponse } from '../../infrastructure/models/pagination/pagination-wrapper.response';
import { IsArrayDefault, ValidateNestedDefault } from '../../infrastructure/utils/class-validator-decorators';
import { ApiDialogResponse } from './api.dialog.response';

export class ApiDialogsListResponse extends PaginationWrapperResponse<ApiDialogResponse> {
  @ValidateNestedDefault()
  @IsArrayDefault
  @ApiProperty({
    type: [ApiDialogResponse],
  })
  items: ApiDialogResponse[];

  constructor({ items, ...pagination }: ApiDialogsListResponse) {
    super(pagination);
    this.items = items;
  }
}
