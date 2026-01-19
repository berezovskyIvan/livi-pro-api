import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ConsentsMapper } from './consents.mapper';
import { ConsentsService } from './consents.service';
import { ConsentsController } from './v1/consents.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ConsentsController],
  providers: [ConsentsService, ConsentsMapper],
})
export class ConsentsModule {}
