import { ApiProperty } from '@nestjs/swagger';

import { IsIntDefault } from '../../utils/class-validator-decorators';

export abstract class PaginationWrapperResponse<T> {
  @IsIntDefault
  @ApiProperty({
    type: 'integer',
  })
  currentPage: number;

  @IsIntDefault
  @ApiProperty({
    type: 'integer',
  })
  itemsPerPage: number;

  @IsIntDefault
  @ApiProperty({
    type: 'integer',
  })
  totalItems: number;

  @IsIntDefault
  @ApiProperty({
    type: 'integer',
  })
  totalPages: number;

  abstract items: T[];

  protected constructor({ currentPage, itemsPerPage, totalPages, totalItems }: Omit<PaginationWrapperResponse<T>, 'items'>) {
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}
