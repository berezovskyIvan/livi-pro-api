import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DialogsMapper } from './dialogs.mapper';
import { DialogsService } from './dialogs.service';
import { DialogsController } from './v1/dialogs.controller';

@Module({
  imports: [CqrsModule],
  controllers: [DialogsController],
  providers: [DialogsService, DialogsMapper],
})
export class DialogsModule {}
