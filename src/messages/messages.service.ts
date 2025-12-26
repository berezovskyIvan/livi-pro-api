import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { MessagesCountByDialogIdDbQuery } from '../database/messages/queries/messages-count-by-dialog-id.db.query';
import { MessagesCountDbQuery } from '../database/messages/queries/messages-count.db.query';
import { MessagesListByDialogIdDbQuery } from '../database/messages/queries/messages-list-by-dialog-id.db.query';
import { MessagesListDbQuery } from '../database/messages/queries/messages-list.db.query';
import { Utils } from '../infrastructure/utils/utils';
import { MessagesMapper } from './messages.mapper';
import { ApiDialogIdPayload } from './models/api.dialog-id.payload';
import { ApiMessagesByDialogIdPayload } from './models/api.messages-by-dialog-id.payload';
import { ApiMessagesListPayload } from './models/api.messages-list.payload';
import { ApiMessagesListResponse } from './models/api.messages-list.response';

@Injectable()
export class MessagesService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly messagesMapper: MessagesMapper,
  ) {}

  async getMessagesByDialogId(
    dialogId: ApiDialogIdPayload['dialogId'],
    payload: ApiMessagesByDialogIdPayload,
  ): Promise<ApiMessagesListResponse> {
    const [dbMessages, messagesCount] = await Promise.all([
      this.queryBus.execute(new MessagesListByDialogIdDbQuery(dialogId, payload.page, payload.perPage)),
      this.queryBus.execute(new MessagesCountByDialogIdDbQuery(dialogId)),
    ]);
    const apiMessages = this.messagesMapper.dbToApiMessages(dbMessages);

    return {
      currentPage: payload.page,
      itemsPerPage: payload.perPage,
      totalItems: messagesCount,
      totalPages: Utils.countTotalPages({ totalItems: messagesCount, itemsPerPage: payload.perPage }),
      items: apiMessages,
    };
  }

  async getMessagesList(payload: ApiMessagesListPayload): Promise<ApiMessagesListResponse> {
    const [dbMessages, messagesCount] = await Promise.all([
      this.queryBus.execute(new MessagesListDbQuery(payload.page, payload.perPage)),
      this.queryBus.execute(new MessagesCountDbQuery()),
    ]);
    const apiMessages = this.messagesMapper.dbToApiMessages(dbMessages);

    return {
      currentPage: payload.page,
      itemsPerPage: payload.perPage,
      totalItems: messagesCount,
      totalPages: Utils.countTotalPages({ totalItems: messagesCount, itemsPerPage: payload.perPage }),
      items: apiMessages,
    };
  }
}
