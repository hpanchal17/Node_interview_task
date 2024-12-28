import { Global, Module } from '@nestjs/common';
import { EmailService } from '@shareable/mailer/email.service';

@Global()
@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
