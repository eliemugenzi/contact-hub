import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import httpResponse, { HttpResponse } from 'src/utils/helpers/httpResponse';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createAccount(@Body() data: RegisterDTO): Promise<HttpResponse> {
    const result = await this.authService.createAccount(data);
    return httpResponse({
      status: HttpStatus.CREATED,
      data: result,
      message: 'A user has been created!',
    });
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDTO): Promise<HttpResponse> {
    const result = await this.authService.login(data);

    return httpResponse({
      status: HttpStatus.OK,
      message: 'A user is successfully logged in',
      data: result,
    });
  }
}
