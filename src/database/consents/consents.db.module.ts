import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './commands/consents.db.commands';
import { ConsentsEntity } from './entity/consents.entity';

import { QueryHandlers } from './queries/consents.db.handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ConsentsEntity], 'livi_pro')],
  providers: [...QueryHandlers, ...CommandHandlers],
  exports: [...QueryHandlers, ...CommandHandlers],
})
export class ConsentsDbModule {}
