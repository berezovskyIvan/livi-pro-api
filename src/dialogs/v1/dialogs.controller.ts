import { Query } from '@nestjs/common';

import { GetAction, TagController } from '../../infrastructure/decorators/controllers-decorators';
import { DialogsService } from '../dialogs.service';
import { ApiDialogsListPayload } from '../models/api.dialogs-list.payload';
import { ApiDialogsListResponse } from '../models/api.dialogs-list.response';

@TagController('dialogs', 1)
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @GetAction({
    description: 'Получение списка диалогов',
    path: 'list',
    response: ApiDialogsListResponse,
  })
  fetchDialogsCount(@Query() payload: ApiDialogsListPayload): Promise<ApiDialogsListResponse> {
    return this.dialogsService.getDialogsList(payload);
  }
}
