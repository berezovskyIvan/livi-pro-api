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
      .leftJoin('messages.user', 'user')
      .orderBy('messages.createdAt', 'DESC')
      .select([
        'messages.id',
        'messages.dialogId',
        'messages.createdAt',
        'messages.senderRole',
        'messages.direction',
        'messages.providerRaw',
        'messages.bodyRaw',
        'messages.bodyMain',
        'messages.hasFooter',
        'messages.footerRaw',
        'messages.footerParsed',
        'messages.generatedAi',
        'messages.userId',
        'user.phone',
        'user.firstName',
        'user.middleName',
        'user.lastName',
      ])
      .offset((page - 1) * perPage)
      .limit(perPage)
      .getRawMany();
  }
}
