import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersGatewayService } from './users-gateway.service';
import { LoginDto } from 'core/dtos/login.dto';
import { signIn } from 'core/dtos/sign.dto';

@Controller()
export class UsersController {
  constructor(private readonly gatewayService: UsersGatewayService) {}

  @Post("/login")
  async login(@Body() login: LoginDto) {
    return await this.gatewayService.loginGateway(login);
  }

  @Post("/sign-in")
  async signUp(@Body() sign: signIn) {
    return await this.gatewayService.signIn(sign);
  }
  
}
