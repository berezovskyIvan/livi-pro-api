import { Query, Param } from '@nestjs/common';

import { GetAction, TagController } from '../../infrastructure/decorators/controllers-decorators';
import { MessagesService } from '../messages.service';
import { ApiDialogIdPayload } from '../models/api.dialog-id.payload';
import { ApiMessagesByDialogIdPayload } from '../models/api.messages-by-dialog-id.payload';
import { ApiMessagesListPayload } from '../models/api.messages-list.payload';
import { ApiMessagesListResponse } from '../models/api.messages-list.response';

@TagController('messages', 1)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @GetAction({
    description: 'Получение списка сообщений',
    path: 'list',
    response: ApiMessagesListResponse,
  })
  fetchMessagesList(@Query() payload: ApiMessagesListPayload): Promise<ApiMessagesListResponse> {
    return this.messagesService.getMessagesList(payload);
  }

  @GetAction({
    description: 'Получение списка сообщений',
    path: ':dialogId',
    response: ApiMessagesListResponse,
  })
  fetchMessagesByDialogId(
    @Param() { dialogId }: ApiDialogIdPayload,
    @Query() payload: ApiMessagesByDialogIdPayload,
  ): Promise<ApiMessagesListResponse> {
    return this.messagesService.getMessagesByDialogId(dialogId, payload);
  }
}
