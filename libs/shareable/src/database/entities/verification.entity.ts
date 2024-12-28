import { UserRoleEnum } from '@shareable/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'verification',
})
export class VerificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
  })
  userId: string;

  @Column({
    enum: UserRoleEnum,
    type: 'varchar',
  })
  for: UserRoleEnum;

  @Column({
    type: 'varchar',
  })
  secret: string;

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
}
