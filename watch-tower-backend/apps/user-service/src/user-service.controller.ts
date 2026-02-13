import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { LoginDto } from 'core/dtos/login.dto';
import { UserDto } from 'core/dtos/user.dto';

@Controller("user")
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Post("/login-user-validation")
  async loginUser(@Body("login") login: LoginDto): Promise<UserDto> {
    return await this.userServiceService.getUser(login);
  }

  @Patch("/change-password")
  async changePassword() {
    return "Change password endpoint";
  }

  @Post("/sign-up-user")
  async signUp() {
    return "Sign up endpoint";
  }

  @Get("/roles")
  async roles(){
    return await this.userServiceService.getRoles();
  }

}
