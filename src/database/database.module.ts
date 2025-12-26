import fs from 'fs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from '../config';
import { DialogsDbModule } from './dialogs/dialogs.db.module';
import { MessagesDbModule } from './messages/messages.db.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'livi_pro',
      useFactory: () => ({
        type: 'postgres',
        autoLoadEntities: true,
        host: Config.dbHost,
        port: Config.dbPort,
        database: Config.dbName,
        username: Config.dbUsername,
        password: Config.dbPassword,
        ssl: {
          rejectUnauthorized: true,
          ca: fs.readFileSync(Config.dbCaPath).toString(),
        },
      }),
    }),
    MessagesDbModule,
    DialogsDbModule,
  ],
})
export class DatabaseModule {}
