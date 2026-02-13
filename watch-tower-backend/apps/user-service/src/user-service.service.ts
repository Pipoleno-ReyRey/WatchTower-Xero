import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'core/dtos/login.dto';
import { signIn } from 'core/dtos/sing.dto';
import { UserDto } from 'core/dtos/user.dto';
import { RoleUserEntity } from 'core/entities/role-user.entity';
import { RoleEntity } from 'core/entities/role.entity';
import { UserEntity } from 'core/entities/user.entity';
import bcrypt from 'node_modules/bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleUserEntity) private roleUserRepository: Repository<RoleUserEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
  ) { }

  async createUser(singIn: signIn): Promise<UserDto> {
    const user = new UserEntity();
    user.name = singIn.name;
    user.userName = singIn.userName;
    user.email = singIn.email;
    user.password = singIn.password;
    user.pin = singIn.pin;
    user.securityQuestion = singIn.securityQuestion;
    user.securityAnswer = singIn.securityAnswer;
    user.email = singIn.email;

    let rolesId = singIn.roles.map(role => {
      return role.id
    })

    let roles = await this.roleRepository.createQueryBuilder()
      .select()
      .where("id IN(...:id))", { id: rolesId })
      .getMany();

    let rolesUsers = roles.map(role => {
      let data = new RoleUserEntity();
      data.user = user.userName;
      data.role = role;

      return data;
    })

    await this.userRepository.save(user);
    await this.roleUserRepository.save(rolesUsers);

    return user as UserDto
  }

  async getUser(user: LoginDto): Promise<UserDto | string> {
    let login: UserEntity | null = await this.userRepository.createQueryBuilder("uu")
      .innerJoinAndSelect("uu.roles", "roles")
      .select()
      .where("uu.user_name = :userName", { userName: user.user })
      .orWhere("uu.email = :email", { email: user.email })
      .getOne();

    try {
      if (login != null) {
        let comparePassword = await bcrypt.compare(user.password, login.password)
        if(comparePassword == true){
          return login as UserDto;
        } else {
          return "user/password incorrect"
        }
      } else {
        return "user not found"
      }
    } catch (error: any) {
      return error.message as string;
    }
  }
}