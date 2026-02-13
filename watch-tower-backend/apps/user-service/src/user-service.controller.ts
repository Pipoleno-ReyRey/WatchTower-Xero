import { Body, Controller, Get, HttpStatus, Patch, Post } from '@nestjs/common';
import { UserService } from './user-service.service';
import { LoginDto } from 'core/dtos/login.dto';

@Controller("user")
export class UserServiceController {
  constructor(private readonly userService: UserService) {}

  @Post("/login-user-validation")
  async loginUser(@Body("login") login: LoginDto) {
    let response = await this.userService.getUser(login);
    if(typeof(response) != "string"){
      return response;
    } else {
      return {
        message: response,
        status: HttpStatus.BAD_REQUEST
      };
    }

  }

  @Patch("/change-password")
  async changePassword() {
    return "Change password endpoint";
  }

  @Post("/sign-in-user")
  async signUp() {
    return "Sign up endpoint";
  }

}
