import { Global, Module } from '@nestjs/common';
import { UserRepository } from '@shareable/database/repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@shareable/database/entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoryModule {}
