import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { LoginDto } from 'core/dtos/login.dto';
import { UserDto } from 'core/dtos/user.dto';

@Controller("token")
export class AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async loginToken(@Body("user") user: UserDto) {
    return "Login endpoint";
  }
}
