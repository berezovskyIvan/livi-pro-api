import { IUser } from '../../users/interfaces';

export interface IMessage {
  messages_id: string;
  messages_dialog_id: string;
  messages_created_at: Date | null;
  messages_sender_role: string;
  messages_direction: string;
  messages_provider_raw: string;
  messages_body_raw: string;
  messages_body_main: string;
  messages_has_footer: boolean | null;
  messages_footer_raw: null;
  messages_footer_parsed: null;
  messages_generated_ai: boolean | null;
  messages_user_id: string | null;
  user_phone: IUser['user_phone'];
  user_first_name: IUser['user_first_name'];
  user_middle_name: IUser['user_middle_name'];
  user_last_name: IUser['user_last_name'];
}
