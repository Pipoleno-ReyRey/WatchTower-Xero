import { Body, Controller, Get, HttpException, HttpStatus, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto } from 'core/dtos/login.dto';
import { signIn } from 'core/dtos/sign.dto';
import { AuthGuard } from 'core/guards/auth.guard';
import { RoleEntity } from 'core/entities/role.entity';
import { UserService } from './user.service';
import { roleDto } from 'core/dtos/role.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  async loginUser(@Body() login: LoginDto) {
    let response = await this.userService.getUser(login);
    if(!response){
      throw new UnauthorizedException;
    } else {
      return response;
    }
  }

  @Patch("/change-password")
  async changePassword() {
    return "Change password endpoint";
  }

  @Post("/sign-in")
  async signUp(@Body() sign: signIn) {
    let response = await this.userService.createUser(sign)
    if(!response){
      throw new HttpException("user exist", 409)
    } else {
      return response;
    }
  }

  @Get("/all")
  @UseGuards(AuthGuard)
  async all(){
    return await this.userService.getAllUsers();
  }

  @Get("/roles/all")
  @UseGuards(AuthGuard)
  async allRoles(): Promise<RoleEntity[]>{
    return await this.userService.getAllRoles();
  }

  @Post("role")
  @UseGuards(AuthGuard)
  async postRole(@Body() role: roleDto){
    return await this.userService.createRole(role);
  }
}
