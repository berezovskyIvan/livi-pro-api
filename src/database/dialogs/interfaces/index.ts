export interface IDialog {
  dialogs_id: string;
  dialogs_session_key: string | null;
  dialogs_channel_id: string | null;
  dialogs_user_id: string | null;
  dialogs_operator_id: string | null;
  dialogs_fsm_state: string | null;
  dialogs_created_at: string | null;
  dialogs_updated_at: string | null;
}
