import { IConsent } from '../interfaces';

export class ConsentWithdrawDbCommand {
  constructor(public readonly id: IConsent['consent_id']) {}
}
