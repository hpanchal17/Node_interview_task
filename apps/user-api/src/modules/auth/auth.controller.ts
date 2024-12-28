import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRoleEnum } from '@shareable/enum';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from '@shareable/response.interceptor';
import { LoginReqDto, LoginResDto, RegiesterReqDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'regiester API for the user',
  })
  @ApiBadRequestResponse({
    description: 'invalid credentials',
  })
  @ApiOkResponse({
    type: LoginResDto,
  })
  @Response(LoginResDto)
  @Post('register/customer')
  registerCustomer(@Body() body: RegiesterReqDto) {
    return this.authService.register(body, UserRoleEnum.User);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'regiester API for the Admin',
  })
  @ApiBadRequestResponse({
    description: 'invalid credentials',
  })
  @ApiOkResponse({
    type: LoginResDto,
  })
  @Response(LoginResDto)
  @Post('register/admin')
  registerAdmin(@Body() body: RegiesterReqDto) {
    return this.authService.register(body, UserRoleEnum.Admin);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'login API for the Admin',
  })
  @ApiBadRequestResponse({
    description: 'invalid credentials',
  })
  @ApiOkResponse({
    type: LoginResDto,
  })
  @Post('login/admin')
  loginAdmin(body: LoginReqDto) {
    return this.authService.validateLogin(body, UserRoleEnum.Admin);
  }
}
