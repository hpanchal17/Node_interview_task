import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@shareable/database/repository';
import { HashService } from '@shareable/hashing/hash.service';
import { EmailService } from '@shareable/mailer/email.service';
import { UserRoleEnum } from '@shareable/enum';
import { LoginReqDto, RegiesterReqDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly emailService: EmailService,
  ) {}

  async register(body: RegiesterReqDto, role: UserRoleEnum) {
    const hashedPassword = await this.hashService.hash(body.password);
    const user = this.userRepository.create({
      ...body,
      password: hashedPassword,
      role,
    });

    await Promise.all([
      this.userRepository.save(user),
      this.emailService.sendEmail(
        body.email,
        'welcome mail',
        'Please verify your email address by clicking the link below.',
      ),
    ]);
    return user;
  }

  async validateLogin(body: LoginReqDto, role: string) {
    const { email, password } = body;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.role !== role) {
      throw new UnauthorizedException('You are not allowed to login from here');
    }
    const isPasswordMatch = await this.hashService.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
