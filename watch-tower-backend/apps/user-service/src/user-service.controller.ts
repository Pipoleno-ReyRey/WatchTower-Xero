import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { LoginDto } from 'core/dtos/login.dto';

@Controller("user")
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Post("/login-user-validation")
  async loginUser(@Body("login") login: LoginDto) {
    return "Login endpoint";
  }

  @Patch("/change-password")
  async changePassword() {
    return "Change password endpoint";
  }

  @Post("/sign-up-user")
  async signUp() {
    return "Sign up endpoint";
  }
}
