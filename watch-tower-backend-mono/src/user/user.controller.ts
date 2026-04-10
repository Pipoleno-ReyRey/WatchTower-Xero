import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
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
    let response = await this.userService.Loggin(login, req.ip);
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
  async all(@Req() req) {
    if(req.info.role[0].id == 3 || req.info.role[0].id == 1){
      return await this.userService.getAllUsers();
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get("/roles/all")
  @UseGuards(AuthGuard)
  async allRoles(@Req() req): Promise<RoleEntity[]>{
    if(req.info.role[0].id == 3 || req.info.role[0].id == 1){
      return await this.userService.getAllRoles();
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post("role")
  @UseGuards(AuthGuard)
  async postRole(@Body() role: roleDto, @Req() req){
    if(req.info.role[0].id == 1){
      return await this.userService.createRole(role);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get("user/get/:id")
  @UseGuards(AuthGuard)
  async getUser(@Param("id", ParseIntPipe) id: number, @Req() req){
    if(req.info.role[0].id == 1){
      return await this.userService.getUserId(id);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Patch("user/update")
  @UseGuards(AuthGuard)
  async patchUser(@Body() user: UpdateUser, @Req() req){
    if(req.info.role[0].id == 1){
      return await this.userService.update(user, req.ip);
    } else {
      throw new UnauthorizedException();
    }
  }
  
  @Delete("user/:id")
  @UseGuards(AuthGuard)
  async deleteUser(@Param("id") id: number, @Req() req){
    if(req.info.role[0].id == 1){
      await this.userService.deleteUser(id, req.info.userName, req.ip);
    } else {
      throw new UnauthorizedException("not authored user to this action");
    }
  }
}
