import { Injectable } from '@nestjs/common';

import { Cast } from '../infrastructure/utils/cast';
import { ApiMessageResponse } from './models/api.message.response';
import type { IMessage } from '../database/messages/interfaces';

@Injectable()
export class MessagesMapper {
  dbToApiMessages(dbMessages: IMessage[]): ApiMessageResponse[] {
    return dbMessages.map((message) => {
      return {
        id: Cast.toTrimmedString(message.messages_id),
        dialogId: Cast.toTrimmedString(message.messages_dialog_id),
        createdAt: message.messages_created_at ?? undefined,
        direction: Cast.toTrimmedString(message.messages_direction),
        senderRole: Cast.toTrimmedString(message.messages_sender_role),
        providerRaw: Cast.tryToTrimmedString(message.messages_provider_raw),
        bodyRaw: Cast.tryToTrimmedString(message.messages_body_raw),
        bodyMain: Cast.tryToTrimmedString(message.messages_body_main),
        hasFooter: Cast.toBool(message.messages_has_footer),
        footerRaw: Cast.tryToTrimmedString(message.messages_footer_raw),
        footerParsed: Cast.tryToTrimmedString(message.messages_footer_parsed),
      };
    });
  }
}
