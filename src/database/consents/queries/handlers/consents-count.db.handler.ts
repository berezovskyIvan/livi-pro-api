import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConsentsEntity } from '../../entity/consents.entity';
import { ConsentsCountDbQuery } from '../consents-count.db.query';

@QueryHandler(ConsentsCountDbQuery)
export class ConsentsCountDbHandler implements IQueryHandler<ConsentsCountDbQuery> {
  constructor(
    @InjectRepository(ConsentsEntity, 'livi_pro')
    private readonly consentsEntityRepository: Repository<ConsentsEntity>,
  ) {}

  execute(): Promise<number> {
    return this.consentsEntityRepository.count();
  }
}
