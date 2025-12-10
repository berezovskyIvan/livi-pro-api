import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessagesEntity } from '../../entity/messages.entity';
import { MessagesCountDbQuery } from '../messages-count.db.query';

@QueryHandler(MessagesCountDbQuery)
export class MessagesCountDbHandler implements IQueryHandler<MessagesCountDbQuery> {
  constructor(
    @InjectRepository(MessagesEntity, 'livi_pro')
    private readonly messagesEntityRepository: Repository<MessagesEntity>,
  ) {}

  execute(): Promise<number> {
    return this.messagesEntityRepository.count();
  }
}
