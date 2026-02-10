import { Injectable } from '@nestjs/common';

import { ApplicationType } from './interfaces';

@Injectable()
export class MailMapper {
  applicationTypeToString(applicationType: ApplicationType): string {
    switch (applicationType) {
      case ApplicationType.CallQualityControl:
        return 'Контроль качества звонков';
      case ApplicationType.Calls:
        return 'Звонки';
      case ApplicationType.Concierge:
        return 'Консьерж';
    }
  }
}
