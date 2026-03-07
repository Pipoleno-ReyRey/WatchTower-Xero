import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from 'core/dtos/login.dto';
import { signIn } from 'core/dtos/sign.dto';
import { RoleEntity } from 'core/entities/role.entity';

@Injectable()
export class UsersGatewayService {

  async loginGateway(login: LoginDto) {
    try {
      let response = await fetch("http://localhost:8003/token/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      })


      if (response.ok) {
        return await response.json();
      } else if(response.status === 404) {
        throw new HttpException("not found", 404);
      }
    } catch (error: any) {
      throw new HttpException(error.message, 404);
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
        console.log(data);
        return await this.loginGateway(data);
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
}
