import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  // register(@Req() request: Request) {
  // register(@Body('email) email: string,@Body('password) password: string) {
  register(@Body() body: AuthDTO) {
    // body'type must be data transfer object -DTO
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthDTO) {
    return this.authService.login(body);
  }
}
