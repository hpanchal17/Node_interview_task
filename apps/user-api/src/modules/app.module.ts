import { Module } from '@nestjs/common';
import { RepositoryModule } from '@shareable/database/repository.module';
import { Logger } from '@shareable/logger';
import { ConfigurationModule } from '@shareable/configuration/configuration.module';
import { JwtModule } from '@shareable/jwt/jwt.module';
import { DatabaseModule } from '@shareable/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigurationModule, JwtModule, DatabaseModule, RepositoryModule, AuthModule],
  providers: [Logger],
})
export class AppModule {}
