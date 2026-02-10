import { Body } from '@nestjs/common';

import { PostAction, TagController } from '../../infrastructure/decorators/controllers-decorators';
import { ApiEmptyResponse } from '../../infrastructure/models/api.empty-response';
import { MailService } from '../mail.service';
import { ApiSendApplicationPayload } from '../models/api.send-application.payload';

@TagController('mail', 1)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @PostAction({
    description: 'Отправка почтового сообщения',
    path: 'send/application',
    response: ApiEmptyResponse,
  })
  sendApplication(@Body() payload: ApiSendApplicationPayload): Promise<ApiEmptyResponse> {
    return this.mailService.sendApplication(payload);
  }
}
