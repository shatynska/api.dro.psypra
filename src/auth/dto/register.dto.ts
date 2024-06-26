import { IsPasswordsMatchingConstraint } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { MinLength, Validate } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'myUserName',
  })
  @MinLength(4)
  userName!: string;

  @ApiProperty({ example: 'secret_password' })
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'secret_password' })
  @MinLength(6)
  @Validate(IsPasswordsMatchingConstraint)
  passportRepeat!: string;
}
