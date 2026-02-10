import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { Config } from '../config';
import { MailMapper } from './mail.mapper';
import { MailService } from './mail.service';
import { MailController } from './v1/mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: Config.yandexPostboxHost,
        port: Config.yandexPostboxPort,
        secure: true,
        auth: {
          user: Config.yandexPostboxUsername,
          pass: Config.yandexPostboxPass,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService, MailMapper],
})
export class MailModule {}
