import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthTypeEnum, UserRoleEnum } from '@shareable/enum';
import { ApiException, ErrorCodes } from '@shareable/exception';
import { JwtService } from '@shareable/jwt/jwt.service';
import { ModeratorRepository } from '@shareable/database/repository';
import { JwtInterface } from 'apps/user-api/src/interface/jwt.interface';

@Injectable()
export class ModeratorGuard implements CanActivate {
  private readonly defaultAuthType = AuthTypeEnum.Bearer;

  constructor(
    private reflector: Reflector,
    private readonly tokenService: JwtService,
    private readonly moderatorRepository: ModeratorRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const guards = this.reflector.getAllAndOverride('authType', [
      context.getHandler(),
      context.getClass(),
    ]) ?? [this.defaultAuthType];
    for (const guard of guards as AuthTypeEnum[]) {
      if (guard === AuthTypeEnum.Bearer) {
        return this.BearerValidation(context);
      }
    }
    return true;
  }

  protected async BearerValidation(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const decode: JwtInterface = await this.tokenService.decodeFromHeader(
      request,
    );
    if (decode.for == UserRoleEnum.Moderator) {
      const user = await this.moderatorRepository.findOneBy({
        id: decode.id.toString(),
      });
      if (user) {
        user.isActiveCheck();
        request.moderator = user;
        return true;
      }
    }
    throw new ApiException(ErrorCodes.LoginRequired);
  }
}
