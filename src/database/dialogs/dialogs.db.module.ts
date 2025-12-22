import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DialogsEntity } from './entity/dialogs.entity';
import { QueryHandlers } from './queries/dialogs.db.handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([DialogsEntity], 'livi_pro')],
  providers: [...QueryHandlers],
  exports: [...QueryHandlers],
})
export class DialogsDbModule {}
