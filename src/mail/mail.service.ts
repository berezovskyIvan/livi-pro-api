import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { ApiEmptyResponse } from '../infrastructure/models/api.empty-response';
import { MailMapper } from './mail.mapper';
import { ApiSendApplicationPayload } from './models/api.send-application.payload';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailMapper: MailMapper,
  ) {}

  async sendApplication(payload: ApiSendApplicationPayload): Promise<ApiEmptyResponse> {
    const applicationType = this.mailMapper.applicationTypeToString(payload.applicationType);

    try {
      await this.mailerService.sendMail({
        to: payload.email,
        from: 'zayavka@livi-pro.ru',
        subject: `Подключение услуги "${applicationType}"`,
        html: `<p>Ваша заявка на подключение услуги "${applicationType}" принята, ожидайте обратную связь.
          <br><b>Это письмо сформировано автоматически, отвечать на него не нужно.</b></p>`,
      });

      return { ok: true };
    } catch (_err) {
      return { ok: false };
    }
  }
}
