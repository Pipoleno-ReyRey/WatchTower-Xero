import { Body, Controller, Get, HttpException, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user-service.service';
import { LoginDto } from 'core/dtos/login.dto';
import { signIn } from 'core/dtos/sign.dto';
import { MessageChannel } from 'worker_threads';
import { AuthGuard } from 'core/guards/auth.guard';

@Controller("user")
export class UserServiceController {
  constructor(private readonly userService: UserService) {}

  @Post("/login-user-validation")
  async loginUser(@Body() login: LoginDto) {
    let response = await this.userService.getUser(login);
    if(!response){
      throw new HttpException("user not found", 404)
    } else {
      return response;
    }
  }

  @Patch("/change-password")
  async changePassword() {
    return "Change password endpoint";
  }

  @Post("/sign-in-user")
  async signUp(@Body("sign") sign: signIn) {
    return await this.userService.createUser(sign)
  }

  @Get("/all")
  @UseGuards(AuthGuard)
  async all(){
    return await this.userService.getAllUsers();
  }
}
