import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { LoginDto } from 'core/dtos/login.dto';
import { UserDto } from 'core/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService
  ) { }

  async generateToken(login: LoginDto) {

    try {
      let user = (await fetch("http://localhost:8001/user/login-user-validation",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(login),
        }
      ));

      let data = await user.json()
      let response = {
        userName: data.userName,
        email: data.email,
        role: data.role
      }

      if (user.ok) {
        return {
          ...response,
          token: this.jwt.sign(response)
        }
      } else {
        throw new HttpException("not found", 404);
      }
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  validateToken(token: string){
    return this.jwt.verify(token, {
      secret: process.env.TOKEN_SECRET
    })
  }
}
