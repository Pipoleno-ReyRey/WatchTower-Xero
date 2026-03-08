import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'core/dtos/login.dto';
import { signIn } from 'core/dtos/sign.dto';
import { UserDto } from 'core/dtos/user.dto';
import { RoleEntity } from 'core/entities/role.entity';

@Injectable()
export class UsersGatewayService {

  async loginGateway(login: LoginDto, ip: string) {
    try {
      login.session = {
        ip: ip,
        action: "LOGIN",
        status: true
      };

      let response = await fetch("http://localhost:8003/token/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      })


      if (response.ok) {
        return await response.json();
      } else if(response.status === 401) {
        throw new UnauthorizedException();
      }
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }

  async signIn(user: signIn, ip: string): Promise<LoginDto | null>{
    try{
      user.ip = ip;
      let login = await fetch("http://localhost:8001/user/sign-in-user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if(login.ok){
        let data = (await login.json()) as LoginDto;
        data.password = user.password;
        return await this.loginGateway(data, ip);
      } else {
        return null;
      }
    } catch(error: any){
      throw new HttpException(error.message, 500);
    }
  }

  async getRoles(token: string): Promise<RoleEntity[] | null>{
    try{
      let data = await fetch("http://localhost:8001/user/roles/all", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "token": token
        }
      });

      if(data.ok){
        return await data.json() as RoleEntity[];
      } else {
        return null;
      }
    } catch(error: any){
      throw new HttpException(error.message, 500);
    }
  }

  async getUsers(token: string){
    try{
      let data = await fetch("http://localhost:8001/user/all", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "token": token
        }
      });

      if(data.ok){
        return await data.json() as UserDto[];
      } else {
        return null;
      }
    } catch(error: any){
      throw new HttpException(error.message, 500);
    }
  }
}
