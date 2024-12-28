import { DataSource, Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { UserEntity } from '@shareable/database/entities';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  isUniqueMail(
    email: string,
    id = '00000000-0000-0000-0000-000000000000',
  ): Promise<number> {
    return this.count({
      where: {
        email,
        id: Not(id),
      },
    });
  }
}
