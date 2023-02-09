import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class SignInDto {
  @ApiProperty({
    description: "User's email",
    example: 'Ronaldo@gmail.com',
    minLength: 3,
    maxLength: 127,
  })
  @MinLength(3)
  @MaxLength(127)
  email: string;

  @ApiProperty({
    description: "User's password",
    example: 'Sandalia123',
    minLength: 8,
  })
  @MinLength(8)
  @IsString()
  @Matches(/[A-Z]/, {
    message: 'password needs a uppercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'password needs a number',
  })
  password: string;
}
