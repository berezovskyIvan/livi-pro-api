import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConsentsEntity } from '../../entity/consents.entity';
import { ConsentsListDbQuery } from '../consents-list.db.query';
import type { IConsent } from '../../interfaces';

@QueryHandler(ConsentsListDbQuery)
export class ConsentsListDbHandler implements IQueryHandler<ConsentsListDbQuery> {
  constructor(
    @InjectRepository(ConsentsEntity, 'livi_pro')
    private readonly consentsEntityRepository: Repository<ConsentsEntity>,
  ) {}

  execute({ page, perPage }: ConsentsListDbQuery): Promise<IConsent[]> {
    return this.consentsEntityRepository
      .createQueryBuilder('consent')
      .leftJoin('consent.user', 'user')
      .select([
        'consent.id',
        'consent.userId',
        'consent.consent',
        'consent.textId',
        'consent.createdAt',
        'user.phone',
        'user.firstName',
        'user.middleName',
        'user.lastName',
        'user.userIdentity',
      ])
      .orderBy('consent.createdAt', 'DESC')
      .offset((page - 1) * perPage)
      .limit(perPage)
      .getRawMany();
  }
}
