import { Injectable } from '@nestjs/common';

import { Cast } from '../infrastructure/utils/cast';
import { ApiConsentResponse } from './models/api.consent.response';
import type { IConsent } from '../database/consents/interfaces';

@Injectable()
export class ConsentsMapper {
  dbToApiConsents(dbConsents: IConsent[]): ApiConsentResponse[] {
    return dbConsents.map((consent) => {
      let userIdentity: unknown = undefined;

      try {
        userIdentity = JSON.parse(consent.user_user_identity ?? '');
      } catch (_err) {}

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
          providerUserId: Cast.tryToInt(
            userIdentity && typeof userIdentity === 'object' && 'provider_user_id' in userIdentity && userIdentity.provider_user_id,
          ),
          providerUsername: Cast.tryToTrimmedString(
            userIdentity && typeof userIdentity === 'object' && 'provider_username' in userIdentity && userIdentity.provider_username,
          ),
        };
      }

      return apiConsent;
    });
  }
}
