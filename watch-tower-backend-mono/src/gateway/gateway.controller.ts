import { Body, Controller, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { LoginDto } from 'core/dtos/login.dto';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post("token")
  async loginToken(@Body() login: LoginDto) {
    return await this.gatewayService.generateToken(login);
  }
}
