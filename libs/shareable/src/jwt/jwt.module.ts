import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as baseModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

const jwtFactory = {
  useFactory: (config: ConfigService) => {
    return {
      global: true,
      secret: config.getOrThrow<string>('tokens.jwt.secret'),
      signOptions: {
        expiresIn: config.getOrThrow<string>('tokens.jwt.tokenTll'),
      },
    };
  },
  inject: [ConfigService],
};

@Global()
@Module({
  imports: [baseModule.registerAsync(jwtFactory)],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
