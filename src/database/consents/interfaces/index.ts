export interface IConsent {
  consent_id: number;
  consent_user_id: string;
  consent_consent: boolean;
  consent_text_id: string | null;
  consent_created_at: Date | null;
}
