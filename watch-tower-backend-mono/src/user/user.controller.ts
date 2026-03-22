import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto } from 'core/dtos/login.dto';
import { signIn } from 'core/dtos/sign.dto';
import { AuthGuard } from 'core/guards/auth.guard';
import { RoleEntity } from 'core/entities/role.entity';
import { UserService } from './user.service';
import { roleDto } from 'core/dtos/role.dto';
import { UpdateUser } from 'core/dtos/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/login")
  async loginUser(@Body() login: LoginDto, @Req() req) {
    let response = await this.userService.getUser(login, req.ip);
    if(!response){
      throw new UnauthorizedException;
    } else {
      return response;
    }
  }

  @Patch("/change")
  async changePassword(@Body() data: {password?: string; pin?: string}, @Req() req) {
    return await this.userService.updateUser(req.info.userName, data.password, data.pin);
  }

  @Post("/sign-in")
  async signUp(@Body() sign: signIn, @Req() req) {
    let response = await this.userService.createUser(sign, req.ip)
    if(!response){
      throw new HttpException("user exist", 409)
    } else {
      return response;
    }
  }

  @Get("user/all")
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

  @Get("user/get/:id")
  @UseGuards(AuthGuard)
  async getUser(@Param("id") id: number){
    return await this.userService.getUserId(id);
  }

  @Patch("user/update")
  @UseGuards(AuthGuard)
  async patchUser(@Body() user: UpdateUser, @Req() req){
    if(req.info.role[0].role == "admin"){
      return await this.userService.update(user);
    } else {
      throw new UnauthorizedException();
    }
  }
}
