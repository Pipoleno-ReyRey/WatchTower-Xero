import { Injectable } from '@nestjs/common';
import { LoginDto } from 'core/dtos/login.dto';

@Injectable()
export class GatewayService {

  async loginGateway(login: LoginDto) {
    let response = await fetch("http://localhost:8003/token/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })

    return await response.json()
  }
}
