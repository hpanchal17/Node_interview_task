import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { VerificationEntity } from '@shareable/database/entities/verification.entity';

@Injectable()
export class VerificationRepository extends Repository<VerificationEntity> {
  constructor(dataSource: DataSource) {
    super(VerificationEntity, dataSource.createEntityManager());
  }
}
