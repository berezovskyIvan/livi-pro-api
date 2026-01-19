import { Injectable } from '@nestjs/common';

import { Cast } from '../infrastructure/utils/cast';
import { ApiConsentResponse } from './models/api.consent.response';
import type { IConsent } from '../database/consents/interfaces';

@Injectable()
export class ConsentsMapper {
  dbToApiConsents(dbConsents: IConsent[]): ApiConsentResponse[] {
    return dbConsents.map((consent) => {
      return {
        id: Cast.toInt(consent.consent_id),
        consent: Cast.toBool(consent.consent_consent),
        createdAt: consent.consent_created_at ?? undefined,
        userId: Cast.toTrimmedString(consent.consent_user_id),
        textId: Cast.toInt(consent.consent_text_id),
      };
    });
  }
}
