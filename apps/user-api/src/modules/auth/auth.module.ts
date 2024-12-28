import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashService } from '@shareable/hashing/hash.service';
import { EmailService } from '@shareable/mailer/email.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, HashService, EmailService],
})
export class AuthModule {}
