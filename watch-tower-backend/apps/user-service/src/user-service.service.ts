import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'core/dtos/login.dto';
import { roleDto } from 'core/dtos/role.dto';
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

  async createUser(sing: signIn): Promise<UserDto> {
    const user = new UserEntity();
    const password = await bcrypt.hash(sing.password, 10);
    console.log(`hashed password: ${password}`);
    user.name = sing.name;
    user.userName = sing.userName;
    user.email = sing.email;
    user.password = password;
    user.pin = sing.pin;
    user.securityQuestion = sing.securityQuestion;
    user.securityAnswer = sing.securityAnswer;
    user.email = sing.email;

    let rolesId = sing.roles.map(role => {
      return role.id
    })

    let roles = await this.roleRepository.createQueryBuilder()
      .select()
      .where("id IN(:...id)", { id: rolesId })
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

    let roles: roleDto[] = (await this.roleRepository.createQueryBuilder()
    .select(["id as id", "role as role"])
    .where("id IN(:...roles)", {roles: login?.roles.map(role => {return role.role})})
    .getRawMany()) as roleDto[];

    try {
      if (login != null) {
        let hashPass = await bcrypt.hash(user.password, 10);
        let comparePassword = await bcrypt.compare(user.password, login.password);
        if(comparePassword == true){
          return {
            userName: login.userName,
            email: login.email,
            role: roles,
            documents: [],
            policies: []
          };
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