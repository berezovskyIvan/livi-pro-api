import { Query } from '@nestjs/common';

import { GetAction, TagController } from '../../infrastructure/decorators/controllers-decorators';
import { MessagesService } from '../messages.service';
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
}
