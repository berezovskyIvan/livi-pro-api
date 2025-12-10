import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesEntity } from './entity/messages.entity';
import { QueryHandlers } from './queries/messages.db.handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([MessagesEntity], 'livi_pro')],
  providers: [...QueryHandlers],
  exports: [...QueryHandlers],
})
export class MessagesDbModule {}
