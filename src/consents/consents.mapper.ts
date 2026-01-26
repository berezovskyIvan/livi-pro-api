import { Injectable } from '@nestjs/common';

import { Cast } from '../infrastructure/utils/cast';
import { ApiConsentResponse } from './models/api.consent.response';
import type { IConsent } from '../database/consents/interfaces';

@Injectable()
export class ConsentsMapper {
  dbToApiConsents(dbConsents: IConsent[]): ApiConsentResponse[] {
    return dbConsents.map((consent) => {
      const apiConsent: ApiConsentResponse = {
        id: Cast.toInt(consent.consent_id),
        consent: Cast.toBool(consent.consent_consent),
        createdAt: consent.consent_created_at ?? undefined,
        textId: Cast.toInt(consent.consent_text_id),
      };

      if (consent.consent_user_id) {
        apiConsent.user = {
          id: Cast.toTrimmedString(consent.consent_user_id),
          phone: Cast.tryToTrimmedString(consent.user_phone),
          firstName: Cast.tryToTrimmedString(consent.user_first_name),
          middleName: Cast.tryToTrimmedString(consent.user_middle_name),
          lastName: Cast.tryToTrimmedString(consent.user_last_name),
        };
      }

      return apiConsent;
    });
  }
}
