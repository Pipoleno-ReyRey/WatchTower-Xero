import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'core/dtos/login.dto';
import { UserDto } from 'core/dtos/user.dto';

@Injectable()
export class AuthService{
  constructor(
    private jwt: JwtService
  ){}

  async generateToken(user: UserDto): Promise<string> {
    let payload = {
      userName: user.userName,
      email: user.email,
      roles: user.role
    }

    return this.jwt.sign(payload);
  }
}
