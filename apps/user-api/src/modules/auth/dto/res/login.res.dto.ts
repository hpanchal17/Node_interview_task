import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum, UserRoleEnum } from '@shareable/enum';
import { Expose } from 'class-transformer';

export class LoginResDto {
  @Expose()
  @ApiProperty({
    example: '132323343',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: 'John',
  })
  firstName: string;

  @Expose()
  @ApiProperty({
    example: 'doi',
  })
  lastName: string;

  @Expose()
  @ApiProperty({
    example: 'john@yopmail.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    example: UserRoleEnum.User,
  })
  role: UserRoleEnum;

  @Expose()
  @ApiProperty()
  status: StatusEnum.Active;

  @Expose()
  createdAt: string;
}
