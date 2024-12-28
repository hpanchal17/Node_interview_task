import { UserRoleEnum } from '@shareable/enum';

export interface JwtInterface {
  id: string;
  for: UserRoleEnum;
}
