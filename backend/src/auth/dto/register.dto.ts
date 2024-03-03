import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { PASSWORD_REGEX } from 'src/utils/constants';

export class RegisterDTO {
  @MinLength(3)
  @IsNotEmpty()
  first_name: string;

  @MinLength(3)
  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password should have at least 1 lowecase letter, 1 uppercase letter, 1 digit, 1 special character, and should be between 8 and 16 characters long.',
  })
  password: string;
}
