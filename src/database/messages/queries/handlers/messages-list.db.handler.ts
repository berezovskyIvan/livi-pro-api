import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessagesEntity } from '../../entity/messages.entity';
import { MessagesListDbQuery } from '../messages-list.db.query';

import type { IMessage } from '../../interfaces';

@QueryHandler(MessagesListDbQuery)
export class MessagesListDbHandler implements IQueryHandler<MessagesListDbQuery> {
  constructor(
    @InjectRepository(MessagesEntity, 'livi_pro')
    private readonly messagesEntityRepository: Repository<MessagesEntity>,
  ) {}

  execute({ page, perPage }: MessagesListDbQuery): Promise<IMessage[]> {
    return this.messagesEntityRepository
      .createQueryBuilder('messages')
      .orderBy('messages.createdAt', 'DESC')
      .offset((page - 1) * perPage)
      .limit(perPage)
      .getRawMany();
  }
}
