import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "core/dtos/login.dto";
import { roleDto } from "core/dtos/role.dto";
import { signIn } from "core/dtos/sign.dto";
import { UpdateUser, UserDto } from "core/dtos/user.dto";
import { RoleUserEntity } from "core/entities/role-user.entity";
import { RoleEntity } from "core/entities/role.entity";
import { SessionEntity } from "core/entities/sessions.entity";
import { UserEntity } from "core/entities/user.entity";
import bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { AuditLogEntity } from "core/entities/audit-logs.entity";
import { use } from "passport";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleUserEntity)
    private roleUserRepository: Repository<RoleUserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
    @InjectRepository(AuditLogEntity)
    private auditRepo: Repository<AuditLogEntity>,
    private readonly jwt: JwtService,
  ) { }

  async createUser(sign: signIn, ip: string): Promise<LoginDto | null> {
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

      let rolesId = sign.roles.map((role) => {
        return role.id;
      });

      let roles = await this.roleRepository
        .createQueryBuilder()
        .select()
        .where("id IN(:...id)", { id: rolesId })
        .getMany();

      let rolesUsers = roles.map((role) => {
        let data = new RoleUserEntity();
        data.user = user.userName;
        data.role = role.id;

        return data;
      });

      let newUser: UserEntity = await this.userRepository.save(user);
      await this.roleUserRepository.save(rolesUsers);
      let audit: AuditLogEntity = new AuditLogEntity();
      audit.action = "CREATED_USER";
      audit.ip = ip;
      audit.user = newUser;

      await this.auditRepo.save(audit);
      return {
        email: newUser.email,
        user: newUser.userName,
        password: newUser.password,
        pin: newUser.pin,
      };
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async getUser(user: LoginDto, ip: string): Promise<UserDto | any> {
    try {
      let login: UserEntity | null = await this.userRepository
        .createQueryBuilder("uu")
        .innerJoinAndSelect("uu.roles", "roles")
        .where("uu.user_name = :userName", { userName: user.user })
        .orWhere("uu.email = :email", { email: user.email })
        .getOne();

      let crypt = await bcrypt.hash(user.password, 10);

      if (login) {
        let roles: roleDto[] = (await this.roleRepository
          .createQueryBuilder()
          .select(["id as id", "role as role"])
          .where("id IN(:...roles)", {
            roles: login?.roles.map((role) => {
              return role.role;
            }),
          })
          .getRawMany()) as roleDto[];

        let comparePassword = await bcrypt.compare(
          user.password,
          login.password,
        );
        let pin = login.pin === user.pin ? true : false;

        if (comparePassword && pin) {
          // await this.createSession(user, login, "LOGIN")
          let audit: AuditLogEntity = new AuditLogEntity();
          audit.action = "LOGIN_SUCCEEDED";
          audit.ip = ip;
          audit.user = login;

          await this.auditRepo.save(audit);
          let response = {
            userName: login.userName,
            email: login.email,
            role: roles,
          };
          return {
            ...response,
            token: this.jwt.sign(response),
          };
        } else {
          let audit: AuditLogEntity = new AuditLogEntity();
          audit.action = "LOGIN_FAILED";
          audit.ip = ip;
          audit.user = login;

          await this.auditRepo.save(audit);
          return null;
        }
      } else {
        let audit: AuditLogEntity = new AuditLogEntity();
        audit.action = "LOGIN_FAILED";
        audit.ip = ip;

        await this.auditRepo.save(audit);
        return null;
      }
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  private async createSession(
    logs: LoginDto,
    user: UserEntity,
    action: string,
  ) {
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
        .innerJoinAndSelect("uu.audit", "audit")
        .getMany();

      let roles: RoleEntity[] | null = await this.roleRepository
        .createQueryBuilder()
        .select()
        .getMany();

      if (users.length < 0) {
        return;
      }

      let response: UserDto[] = users.map((user) => {
        let risk =
          user.audit.filter((audit) => audit.action == "LOGIN_FAILED").length *
          5;

        return {
          id: user.id,
          name: user.name,
          userName: user.userName,
          email: user.email,
          status: user.status,
          role: user.roles.map((r) => {
            let rol = roles.filter((rol) => rol.id == r.role)[0];
            return {
              id: rol.id,
              role: rol.role,
            };
          }),
          risk: `${risk}%`,
        };
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

  async createRole(create: roleDto): Promise<roleDto | null> {
    try {
      let role: RoleEntity = new RoleEntity();
      role.role = create.role!;
      role.description = create.description!;
      return await this.roleRepository.save(role);
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async updateUser(user: string, password?: string, pin?: string) {
    if (password && !pin) {
      let passCrypt: string = await bcrypt.hash(password, 10);
      try {
        await this.userRepository
          .createQueryBuilder()
          .update(UserEntity)
          .set({
            password: passCrypt,
          })
          .where("user_name = :user", { user: user })
          .execute();
      } catch (error: any) {
        throw new HttpException(error.message, 500);
      }
    } else if (pin && !password) {
      try {
        await this.userRepository
          .createQueryBuilder()
          .update(UserEntity)
          .set({
            pin: pin,
          })
          .where("user_name = :user", { user: user })
          .execute();
      } catch (error: any) {
        throw new HttpException(error.message, 500);
      }
    } else if (pin && password) {
      let passCrypt: string = await bcrypt.hash(password, 10);
      try {
        await this.userRepository
          .createQueryBuilder()
          .update(UserEntity)
          .set({
            password: passCrypt,
            pin: pin,
          })
          .where("user_name = :user", { user: user })
          .execute();
      } catch (error: any) {
        throw new HttpException(error.message, 500);
      }
    }
  }

  async getUserId(id: number) {
    try {
      let user: UserEntity | null = await this.userRepository
        .createQueryBuilder("uu")
        .innerJoinAndSelect("uu.roles", "roles")
        .where("uu.id = :id", { id: id })
        .getOne();

      let role = await this.roleRepository
        .createQueryBuilder()
        .where("id IN(:...ids)", { ids: user?.roles.map(r => { return r.role }) })
        .getMany();

      if (user) {
        return {
          id: user.id,
          name: user.name,
          userName: user.userName,
          email: user.email,
          role: {
            id: role[0].id,
            role: role[0].role
          },
          pin: user.pin
        }
      } else {
        throw new HttpException("user not found", 403);
      }

    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(user: UpdateUser) {
    try {
      let dbUser = await this.userRepository.findOne({where:{id: user.id}});

      let userRole: RoleUserEntity = new RoleUserEntity();
      userRole.user = dbUser!.userName;
      userRole.role = user.rol.id!;

      // await this.roleUserRepository
      //   .createQueryBuilder()
      //   .delete()
      //   .where("user = :user", { user: dbUser!.userName })
      //   .execute();

      let audits = await this.auditRepo
        .createQueryBuilder()
        .select()
        .where("user = :user", { user: dbUser!.userName })
        .getMany();

      // await this.auditRepo.createQueryBuilder().delete().where("user = :user", {user: dbUser!.userName}).execute();

      dbUser!.name = user.name;
      dbUser!.userName = user.userName;
      dbUser!.email = user.email;
      dbUser!.password = await bcrypt.hash(user.password, 10);
      dbUser!.pin = user.pin;
      
      await this.userRepository.save(dbUser!);
      // await this.roleUserRepository.insert(userRole);
      // await this.auditRepo.insert(audits);
      
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }

  }
}
