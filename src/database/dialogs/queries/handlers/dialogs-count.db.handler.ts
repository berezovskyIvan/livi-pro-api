import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DialogsEntity } from '../../entity/dialogs.entity';
import { DialogsCountDbQuery } from '../dialogs-count.db.query';

@QueryHandler(DialogsCountDbQuery)
export class DialogsCountDbHandler implements IQueryHandler<DialogsCountDbQuery> {
  constructor(
    @InjectRepository(DialogsEntity, 'livi_pro')
    private readonly dialogsEntityRepository: Repository<DialogsEntity>,
  ) {}

  execute(): Promise<number> {
    return this.dialogsEntityRepository.count();
  }
}
