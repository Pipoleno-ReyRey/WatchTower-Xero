import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { documentDto } from 'core/dtos/document.dto';
import { LoginDto } from 'core/dtos/login.dto';
import { roleDto } from 'core/dtos/role.dto';
import { sessionDto } from 'core/dtos/session.dto';
import { signIn } from 'core/dtos/sign.dto';
import { UserDto } from 'core/dtos/user.dto';
import { RoleUserEntity } from 'core/entities/role-user.entity';
import { RoleEntity } from 'core/entities/role.entity';
import { SessionEntity } from 'core/entities/sessions.entity';
import { UserEntity } from 'core/entities/user.entity';
import bcrypt from 'node_modules/bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleUserEntity) private roleUserRepository: Repository<RoleUserEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @InjectRepository(SessionEntity) private sessionRepository: Repository<SessionEntity>
  ) { }

  async createUser(sign: signIn): Promise<UserDto> {
    try {
      const user = new UserEntity();
      const password = await bcrypt.hash(sign.password, 10);
      user.name = sign.name;
      user.userName = sign.userName;
      user.email = sign.email;
      user.password = password;
      user.pin = sign.pin;
      user.securityQuestion = sign.securityQuestion;
      user.securityAnswer = sign.securityAnswer;
      user.email = sign.email;

      let rolesId = sign.roles.map(role => {
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

      let newUser: UserEntity = await this.userRepository.save(user);
      await this.roleUserRepository.save(rolesUsers);
      await this.createSession(sign, newUser, "REGISTER");
      return newUser as UserDto;
    } catch (error: any) {
      return error.message;
    }
  }

  async getUser(user: LoginDto): Promise<UserDto | string> {

    try {
      let login: UserEntity | null = await this.userRepository.createQueryBuilder("uu")
        .innerJoinAndSelect("uu.roles", "roles")
        .innerJoinAndSelect("uu.documents", "documents")
        .where("uu.user_name = :userName", { userName: user.user })
        .orWhere("uu.email = :email", { email: user.email })
        .getOne();

      let roles: roleDto[] = (await this.roleRepository.createQueryBuilder()
        .select(["id as id", "role as role"])
        .where("id IN(:...roles)", { roles: login?.roles.map(role => { return role.role }) })
        .getRawMany()) as roleDto[];
      if (login != null) {
        let comparePassword = await bcrypt.compare(user.password, login.password);
        if (comparePassword == true) {
          await this.createSession(user, login, "LOGIN")
          return {
            userName: login.userName,
            email: login.email,
            role: roles,
            documents: login.documents as documentDto[],
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

  private async createSession(logs, user: UserEntity, action: string){
    let session: SessionEntity = {
      ipAddress: logs.session!.ip,
      action: action,
      status: true,
      user: user
    } as SessionEntity;

    return await this.sessionRepository.save(session);
  }
}