import { StatusEnum, UserRoleEnum } from '@shareable/enum';
import { ApiException, ErrorCodes } from '@shareable/exception';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'first_name',
    nullable: true,
  })
  firstName: string | null;

  @Column({
    type: 'varchar',
    name: 'last_name',
    nullable: true,
  })
  lastName: string | null;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'string',
    enum: UserRoleEnum
  })
  role: UserRoleEnum;

  @Column({
    enum: StatusEnum,
    type: 'varchar',
    default: StatusEnum.Active,
  })
  status: StatusEnum;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updated_at',
  })
  updatedAt: Date;

  isActiveCheck() {
    if (this.status == StatusEnum.InActive) {
      throw new ApiException(ErrorCodes.AccountBan);
    }
  }
}
