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

      console.log(user)

      if (user.ok) {

        return user
      } else {

        throw new UnauthorizedException;
      }
    } catch (error: any) {
      throw new HttpException("not found", 404);
    }
  }
}
