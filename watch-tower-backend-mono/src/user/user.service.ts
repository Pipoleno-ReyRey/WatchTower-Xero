import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { documentDto } from 'core/dtos/document.dto';
import { LoginDto } from 'core/dtos/login.dto';
import { roleDto } from 'core/dtos/role.dto';
import { SessionDto } from 'core/dtos/session.dto';
import { signIn } from 'core/dtos/sign.dto';
import { UserDto } from 'core/dtos/user.dto';
import { RoleUserEntity } from 'core/entities/role-user.entity';
import { RoleEntity } from 'core/entities/role.entity';
import { SessionEntity } from 'core/entities/sessions.entity';
import { UserEntity } from 'core/entities/user.entity';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleUserEntity) private roleUserRepository: Repository<RoleUserEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @InjectRepository(SessionEntity) private sessionRepository: Repository<SessionEntity>,
    private readonly jwt: JwtService
  ) { }

  async createUser(sign: signIn): Promise<LoginDto | null> {
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

      let findUser: UserEntity | null = await this.userRepository
        .createQueryBuilder()
        .select()
        .where("user_name = :userName", { userName: user.userName })
        .orWhere("email = :email", { email: user.email })
        .getOne();

      if (findUser) {
        return null;
      }

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
      // await this.createSession(sign, newUser, "REGISTER");
      return {
        email: newUser.email,
        user: newUser.userName,
        password: newUser.password,
        pin: newUser.pin
      };
    } catch (error: any) {
      throw new HttpException(error.message, 500)
    }
  }

  async getUser(user: LoginDto): Promise<UserDto | any> {

    try {
      
      let login: UserEntity | null = await this.userRepository.createQueryBuilder("uu")
        .innerJoinAndSelect("uu.roles", "roles")
        .where("uu.user_name = :userName", { userName: user.user })
        .orWhere("uu.email = :email", { email: user.email })
        .getOne();

      if (login) {
        let roles: roleDto[] = (await this.roleRepository.createQueryBuilder()
          .select(["id as id", "role as role"])
          .where("id IN(:...roles)", { roles: login?.roles.map(role => { return role.role }) })
          .getRawMany()) as roleDto[];

        let comparePassword = await bcrypt.compare(user.password, login.password);
        let pin = login.pin === user.pin ? true : false;

        if (comparePassword && pin) {
          // await this.createSession(user, login, "LOGIN")
          let response = {
            userName: login.userName,
            email: login.email,
            role: roles
          };
          return {
            ...response,
            token: this.jwt.sign(response)
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }

  }

  private async createSession(logs: LoginDto, user: UserEntity, action: string) {
    try {
      let session: SessionEntity = {
        ipAddress: logs.session!.ip,
        action: action,
        status: true,
        user: user,
      } as SessionEntity;

      return await this.sessionRepository.save(session);
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async getAllUsers(): Promise<UserDto[] | undefined> {
    try {
      let users: UserEntity[] | null = await this.userRepository
        .createQueryBuilder("uu")
        .innerJoinAndSelect("uu.roles", "roles")
        .getMany();      

      if (users.length < 0) {
        return;
      }

      let response: UserDto[] = users.map(user => {
        return {
          userName: user.userName,
          email: user.email,
          status: user.status,
          role: user.roles.map(roles => {
            return {
              role: roles.role.role
            }
          })
        }
      });

      return response;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }


  async getAllRoles() {
    let data: RoleEntity[] = await this.roleRepository
      .createQueryBuilder()
      .select()
      .getMany();

    return data;
  }

  // async createRole(): Promise<>{

  // }
}