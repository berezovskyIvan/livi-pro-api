import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessagesEntity } from '../../../messages/entity/messages.entity';
import { DialogsEntity } from '../../entity/dialogs.entity';
import { DialogsListDbQuery } from '../dialogs-list.db.query';

import type { IDialog } from '../../interfaces';

@QueryHandler(DialogsListDbQuery)
export class DialogsListDbHandler implements IQueryHandler<DialogsListDbQuery> {
  constructor(
    @InjectRepository(DialogsEntity, 'livi_pro')
    private readonly dialogsEntityRepository: Repository<DialogsEntity>,
  ) {}

  execute({ page, perPage }: DialogsListDbQuery): Promise<IDialog[]> {
    return this.dialogsEntityRepository
      .createQueryBuilder('dialogs')
      .orderBy('dialogs.updatedAt', 'DESC')
      .leftJoin('dialogs.messages', 'message')
      .select([
        'dialogs.id',
        'dialogs.sessionKey',
        'dialogs.channelId',
        'dialogs.userId',
        'dialogs.operatorId',
        'dialogs.createdAt',
        'dialogs.updatedAt',
        'dialogs.fsmState',
        'message.id',
        'message.createdAt',
        'message.bodyMain',
        'message.senderRole',
        'message.generatedAi',
      ])
      .where(
        (qb) =>
          'message.id = ' +
          qb
            .subQuery()
            .select('m.id')
            .from(MessagesEntity, 'm')
            .where('m.dialogId = dialogs.id')
            .orderBy('m.createdAt', 'DESC')
            .limit(1)
            .getQuery(),
      )
      .offset((page - 1) * perPage)
      .limit(perPage)
      .getRawMany();
  }
}
