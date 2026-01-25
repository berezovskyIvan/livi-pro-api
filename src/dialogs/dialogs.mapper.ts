import { Injectable } from '@nestjs/common';

import { Cast } from '../infrastructure/utils/cast';

import { ApiDialogResponse } from './models/api.dialog.response';
import type { IDialog } from '../database/dialogs/interfaces';

@Injectable()
export class DialogsMapper {
  dbToApiDialogs(dbDialogs: IDialog[]): ApiDialogResponse[] {
    return dbDialogs.map((dialog) => {
      const apiDialog: ApiDialogResponse = {
        id: Cast.toTrimmedString(dialog.dialogs_id),
        channelId: Cast.tryToTrimmedString(dialog.dialogs_channel_id),
        createdAt: dialog.dialogs_created_at ?? undefined,
        fsmState: Cast.tryToTrimmedString(dialog.dialogs_fsm_state),
        operatorId: Cast.tryToTrimmedString(dialog.dialogs_operator_id),
        sessionKey: Cast.tryToTrimmedString(dialog.dialogs_session_key),
        updatedAt: dialog.dialogs_updated_at ?? undefined,
        userId: Cast.tryToTrimmedString(dialog.dialogs_user_id),
        lastMessage: {
          id: Cast.toTrimmedString(dialog.message_id),
          createdAt: dialog.message_created_at ?? undefined,
          bodyMain: Cast.tryToTrimmedString(dialog.message_body_main),
          senderRole: Cast.toTrimmedString(dialog.message_sender_role),
          generatedAi: Cast.toBool(dialog.message_generated_ai),
        },
      };

      if (dialog.message_user_id) {
        apiDialog.lastMessage.user = {
          id: Cast.toTrimmedString(dialog.message_user_id),
          phone: Cast.tryToTrimmedString(dialog.user_phone),
          firstName: Cast.tryToTrimmedString(dialog.user_first_name),
          middleName: Cast.tryToTrimmedString(dialog.user_middle_name),
          lastName: Cast.tryToTrimmedString(dialog.user_last_name),
        };
      }

      return apiDialog;
    });
  }
}
