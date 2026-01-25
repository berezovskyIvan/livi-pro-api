import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessagesEntity } from '../../../messages/entity/messages.entity';
import { DialogsEntity } from '../../entity/dialogs.entity';
import { DialogsCountDbQuery } from '../dialogs-count.db.query';

@QueryHandler(DialogsCountDbQuery)
export class DialogsCountDbHandler implements IQueryHandler<DialogsCountDbQuery> {
  constructor(
    @InjectRepository(DialogsEntity, 'livi_pro')
    private readonly dialogsEntityRepository: Repository<DialogsEntity>,
  ) {}

  execute(): Promise<number> {
    return this.dialogsEntityRepository
      .createQueryBuilder('dialogs')
      .leftJoin('dialogs.messages', 'message')
      .where(
        (qb) =>
          'message.id = ' + qb.subQuery().select('m.id').from(MessagesEntity, 'm').where('m.dialogId = dialogs.id').limit(1).getQuery(),
      )
      .getCount();
  }
}
