import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [DatabaseModule, HealthCheckModule, MessagesModule],
})
export class AppModule {}
