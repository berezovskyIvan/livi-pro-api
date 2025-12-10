import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { MessagesMapper } from './messages.mapper';
import { MessagesService } from './messages.service';
import { MessagesController } from './v1/messages.controller';

@Module({
  imports: [CqrsModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesMapper],
})
export class MessagesModule {}
