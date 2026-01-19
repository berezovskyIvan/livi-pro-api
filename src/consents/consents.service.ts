import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { UpdateResult } from 'typeorm';
import { ConsentWithdrawDbCommand } from '../database/consents/commands/consent-withdraw.db.command';
import { IConsent } from '../database/consents/interfaces';
import { ConsentsCountDbQuery } from '../database/consents/queries/consents-count.db.query';
import { ConsentsListDbQuery } from '../database/consents/queries/consents-list.db.query';
import { ApiEmptyResponse } from '../infrastructure/models/api.empty-response';
import { Utils } from '../infrastructure/utils/utils';

import { ConsentsMapper } from './consents.mapper';
import { ApiConsentIdPayload } from './models/api.consent-id.payload';
import { ApiConsentsListPayload } from './models/api.consents-list.payload';
import { ApiConsentsListResponse } from './models/api.consents-list.response';

@Injectable()
export class ConsentsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly consentsMapper: ConsentsMapper,
  ) {}

  async getConsentsList(payload: ApiConsentsListPayload): Promise<ApiConsentsListResponse> {
    const [dbConsents, consentsCount] = await Promise.all([
      this.queryBus.execute<ConsentsListDbQuery, IConsent[]>(new ConsentsListDbQuery(payload.page, payload.perPage)),
      this.queryBus.execute<ConsentsCountDbQuery, number>(new ConsentsCountDbQuery()),
    ]);
    const apiConsents = this.consentsMapper.dbToApiConsents(dbConsents);

    return {
      currentPage: payload.page,
      itemsPerPage: payload.perPage,
      totalItems: consentsCount,
      totalPages: Utils.countTotalPages({ totalItems: consentsCount, itemsPerPage: payload.perPage }),
      items: apiConsents,
    };
  }

  async withdrawConsent(consentId: ApiConsentIdPayload['consentId']): Promise<ApiEmptyResponse> {
    const updateResult = await this.commandBus.execute<ConsentWithdrawDbCommand, UpdateResult>(new ConsentWithdrawDbCommand(consentId));

    if (updateResult.affected === 0) {
      throw new NotFoundException(`Could not find consent with id: ${consentId}`);
    }

    return ApiEmptyResponse.true();
  }
}
