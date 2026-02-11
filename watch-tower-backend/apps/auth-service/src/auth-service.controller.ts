import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { LoginDto } from 'core/dtos/login.dto';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Post("/login-token")
  async loginToken(@Body("login") login: LoginDto) {
    return "Login endpoint";
  }
}
