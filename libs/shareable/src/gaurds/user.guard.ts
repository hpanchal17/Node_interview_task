import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthTypeEnum, UserRoleEnum } from '@shareable/enum';
import { ApiException, ErrorCodes } from '@shareable/exception';
import { JwtService } from '@shareable/jwt/jwt.service';
import { UserRepository } from '@shareable/database/repository';
import { JwtInterface } from 'apps/user-api/src/interface/jwt.interface';

@Injectable()
export class UserGuard implements CanActivate {
  private readonly defaultAuthType = AuthTypeEnum.Bearer;

  constructor(
    private reflector: Reflector,
    private readonly tokenService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const guards = this.reflector.getAllAndOverride('authType', [
      context.getHandler(),
      context.getClass(),
    ]) ?? [this.defaultAuthType];
    for (const guard of guards as AuthTypeEnum[]) {
      if (guard === AuthTypeEnum.Bearer || guard === AuthTypeEnum.GuestOrUser) {
        return this.BearerValidation(context, guard);
      }
    }
    return true;
  }

  protected async BearerValidation(
    context: ExecutionContext,
    guard: AuthTypeEnum,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const decode: JwtInterface = await this.tokenService.decodeFromHeader(
      request,
      guard == AuthTypeEnum.GuestOrUser,
    );
    if (decode) {
      if (decode.for == UserRoleEnum.User || decode.for == UserRoleEnum.Guest) {
        const user = await this.userRepository.findOne({
          where: {
            id: decode.id.toString(),
          },
        });
        if (user) {
          user.isActiveCheck();
          request.user = user;
          return true;
        }
        throw new ApiException(ErrorCodes.Unauthorized);
      }
    }
    if (guard == AuthTypeEnum.Bearer) {
      throw new ApiException(ErrorCodes.LoginRequired);
    }
    return true;
  }
}
