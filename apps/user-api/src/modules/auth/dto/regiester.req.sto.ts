import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlank } from '@shareable/decorators/is-not-blank.decorator';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegiesterReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @Length(6, 10)
  password: string;
}
