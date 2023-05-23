import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class registerUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'please provide a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  password: string;
}

export default registerUserDto;
