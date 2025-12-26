import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { DialogsCountDbQuery } from '../database/dialogs/queries/dialogs-count.db.query';
import { DialogsListDbQuery } from '../database/dialogs/queries/dialogs-list.db.query';
import { Utils } from '../infrastructure/utils/utils';
import { DialogsMapper } from './dialogs.mapper';

import { ApiDialogsListPayload } from './models/api.dialogs-list.payload';
import { ApiDialogsListResponse } from './models/api.dialogs-list.response';

@Injectable()
export class DialogsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly dialogsMapper: DialogsMapper,
  ) {}

  async getDialogsList(payload: ApiDialogsListPayload): Promise<ApiDialogsListResponse> {
    const [dbDialogs, dialogsCount] = await Promise.all([
      this.queryBus.execute(new DialogsListDbQuery(payload.page, payload.perPage)),
      this.queryBus.execute(new DialogsCountDbQuery()),
    ]);

    const apiDialogs = this.dialogsMapper.dbToApiDialogs(dbDialogs);
    return {
      currentPage: payload.page,
      itemsPerPage: payload.perPage,
      totalItems: dialogsCount,
      totalPages: Utils.countTotalPages({ totalItems: dialogsCount, itemsPerPage: payload.perPage }),
      items: apiDialogs,
    };
  }
}
