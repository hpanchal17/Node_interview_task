import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common/decorators';
import { Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private logger: Logger;
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger();
    if (this.configService.get('mail.port') == '465') {
      this.transporter = nodemailer.createTransport({
        host: this.configService.get('mail.host'),
        port: parseInt(this.configService.get('mail.port')),
        secure: true, // use TLS
        auth: {
          user: this.configService.get('mail.username'),
          pass: this.configService.get('mail.password'),
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
    } else {
      this.transporter = nodemailer.createTransport({
        host: this.configService.get('mail.host'),
        port: parseInt(this.configService.get('mail.port')),
        secure: false,
        auth: {
          user: this.configService.get('mail.username'),
          pass: this.configService.get('mail.password'),
        },
      });
    }
  }

  sendEmail(to: string, subject: string, html: string) {
    const from =
      this.configService.get('mail.from') ??
      this.configService.get('mail.username');
    this.transporter
      .sendMail({
        from,
        to,
        subject,
        html,
        replyTo: 'no-reply@africanLuv.com', // Set a no-reply email address
      })
      .catch((e) => {
        this.logger.error(
          `${subject} failed to send ${to} from ${from}`,
          EmailService.name,
        );
        this.logger.error(`Reason ${e.message}`, EmailService.name);
      })
      .then(() => {
        this.logger.log(
          `${subject} sent to send ${to} from ${from}`,
          EmailService.name,
        );
      });
  }
}
