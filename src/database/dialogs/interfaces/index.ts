import type { IMessage } from '../../messages/interfaces';

export interface IDialog {
  dialogs_id: string;
  dialogs_session_key: string | null;
  dialogs_channel_id: string | null;
  dialogs_user_id: string | null;
  dialogs_operator_id: string | null;
  dialogs_fsm_state: string | null;
  dialogs_created_at: Date | null;
  dialogs_updated_at: Date | null;
  message_id: IMessage['messages_id'];
  message_created_at: IMessage['messages_created_at'];
  message_body_main: IMessage['messages_body_main'];
  message_sender_role: IMessage['messages_sender_role'];
  message_generated_ai: IMessage['messages_generated_ai'];
  message_user_id: IMessage['messages_user_id'];
  user_phone: IMessage['user_phone'];
  user_first_name: IMessage['user_first_name'];
  user_middle_name: IMessage['user_middle_name'];
  user_last_name: IMessage['user_last_name'];
}
