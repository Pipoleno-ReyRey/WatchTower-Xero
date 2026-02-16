import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { documentDto } from 'core/dtos/document.dto';
import { LoginDto } from 'core/dtos/login.dto';
import { roleDto } from 'core/dtos/role.dto';
import { sessionDto } from 'core/dtos/session.dto';
import { signIn } from 'core/dtos/sing.dto';
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

  async createUser(sing: signIn): Promise<UserDto> {
    try {
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
          await this.createSession(user, login)
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

  private async createSession(login: LoginDto, user: UserEntity){
    let session: SessionEntity = {
      ipAddress: login.session!.ip,
      action: "LOGIN",
      status: true,
      user: user
    } as SessionEntity;

    return await this.sessionRepository.save(session);
  }
}