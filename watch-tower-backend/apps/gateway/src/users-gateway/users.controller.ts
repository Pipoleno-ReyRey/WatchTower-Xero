import { Body, Controller, Get, HttpException, Post, Req, Headers } from '@nestjs/common';
import { UsersGatewayService } from './users-gateway.service';
import { LoginDto } from 'core/dtos/login.dto';
import { signIn } from 'core/dtos/sign.dto';

@Controller()
export class UsersController {
  constructor(private readonly gatewayService: UsersGatewayService) {}

  @Post("/login")
  async login(@Body() login: LoginDto, @Req() req) {
    return await this.gatewayService.loginGateway(login, req.ip as string);
  }

  @Post("/sign-in")
  async signUp(@Body() sign: signIn, @Req() req) {
    let response = await this.gatewayService.signIn(sign, req.ip as string);
    if(!response){
      throw new HttpException("user exist", 409);
    } else {
      return response;
    }
  }

  @Get("/roles/all")
  async allRoles(@Headers("token") token: string){
    let response = await this.gatewayService.getRoles(token);
    if(!response){
      throw new HttpException("roles not found", 404);
    } else {
      return response;
    }
  }
  
}
