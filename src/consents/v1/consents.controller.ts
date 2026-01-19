import { Param, Query } from '@nestjs/common';

import { GetAction, PatchAction, TagController } from '../../infrastructure/decorators/controllers-decorators';
import { ApiEmptyResponse } from '../../infrastructure/models/api.empty-response';
import { ConsentsService } from '../consents.service';
import { ApiConsentIdPayload } from '../models/api.consent-id.payload';
import { ApiConsentsListPayload } from '../models/api.consents-list.payload';
import { ApiConsentsListResponse } from '../models/api.consents-list.response';

@TagController('consents', 1)
export class ConsentsController {
  constructor(private readonly consentsService: ConsentsService) {}

  @GetAction({
    description: 'Получение списка согласий',
    path: 'list',
    response: ApiConsentsListResponse,
  })
  fetchConsentsList(@Query() payload: ApiConsentsListPayload): Promise<ApiConsentsListResponse> {
    return this.consentsService.getConsentsList(payload);
  }

  @PatchAction({
    description: 'Отзыв согласия',
    path: 'withdraw/:consentId',
    response: ApiEmptyResponse,
  })
  withdrawConsent(@Param() { consentId }: ApiConsentIdPayload): Promise<ApiEmptyResponse> {
    return this.consentsService.withdrawConsent(consentId);
  }
}
