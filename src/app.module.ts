import { Module } from '@nestjs/common';

import { ConsentsModule } from './consents/consents.module';
import { DatabaseModule } from './database/database.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [DatabaseModule, HealthCheckModule, MessagesModule, DialogsModule, ConsentsModule],
})
export class AppModule {}
