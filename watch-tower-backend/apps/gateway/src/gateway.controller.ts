import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { LoginDto } from 'core/dtos/login.dto';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post("/login")
  async login(@Body() login: LoginDto) {
    return await this.gatewayService.loginGateway(login);
  }

  @Post("/sign")
  async signUp() {
    return "Sign up endpoint";
  }
  
}
