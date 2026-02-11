import { Controller, Get, Patch, Post } from '@nestjs/common';
import { UserServiceService } from './user-service.service';

@Controller("user")
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Post("/login")
  async login() {
    return "Login endpoint";
  }

  @Patch("/change-password")
  async changePassword() {
    return "Change password endpoint";
  }

  @Post("/sign")
  async signUp() {
    return "Sign up endpoint";
  }
}
