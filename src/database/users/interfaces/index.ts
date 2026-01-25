export interface IUser {
  user_id: string;
  user_user_identity: string | null;
  user_identity_confirmed: boolean | null;
  user_rights: string | null;
  user_created_at: Date | null;
  user_updated_at: Date | null;
  user_phone: string | null;
  user_first_name: string | null;
  user_middle_name: string | null;
  user_last_name: string | null;
  user_date_of_birth: Date | null;
  user_profile_source: string | null;
  user_profile_verified: boolean | null;
}
