import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ConsentsEntity } from '../../entity/consents.entity';
import { ConsentWithdrawDbCommand } from '../consent-withdraw.db.command';

@CommandHandler(ConsentWithdrawDbCommand)
export class ConsentWithdrawDbHandler implements ICommandHandler<ConsentWithdrawDbCommand> {
  constructor(
    @InjectRepository(ConsentsEntity, 'livi_pro')
    private readonly consentsEntityRepository: Repository<ConsentsEntity>,
  ) {}

  execute({ id }: ConsentWithdrawDbCommand): Promise<UpdateResult> {
    return this.consentsEntityRepository.update({ id }, { consent: false });
  }
}
