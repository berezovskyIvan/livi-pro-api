import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessagesEntity } from '../../entity/messages.entity';
import { MessagesCountByDialogIdDbQuery } from '../messages-count-by-dialog-id.db.query';

@QueryHandler(MessagesCountByDialogIdDbQuery)
export class MessagesCountByDialogIdDbHandler implements IQueryHandler<MessagesCountByDialogIdDbQuery> {
  constructor(
    @InjectRepository(MessagesEntity, 'livi_pro')
    private readonly messagesEntityRepository: Repository<MessagesEntity>,
  ) {}

  execute({ dialogId }: MessagesCountByDialogIdDbQuery): Promise<number> {
    return this.messagesEntityRepository.count({
      where: { dialogId },
    });
  }
}
