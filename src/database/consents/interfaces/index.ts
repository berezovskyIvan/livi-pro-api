import { IUser } from '../../users/interfaces';

export interface IConsent {
  consent_id: number;
  consent_user_id: string;
  consent_consent: boolean;
  consent_text_id: string | null;
  consent_created_at: Date | null;
  user_phone: IUser['user_phone'];
  user_first_name: IUser['user_first_name'];
  user_middle_name: IUser['user_middle_name'];
  user_last_name: IUser['user_last_name'];
  user_user_identity: IUser['user_user_identity'];
}
