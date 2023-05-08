import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestData } from './auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public signIn(@Body() data: SignInRequestData) {
    return this.authService.signIn(data.email, data.password);
  }
}
