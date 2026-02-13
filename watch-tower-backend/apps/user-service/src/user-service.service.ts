import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'core/dtos/login.dto';
import { roleDto } from 'core/dtos/role.dto';
import { signIn, signUp } from 'core/dtos/sing.dto';
import { UserDto } from 'core/dtos/user.dto';
import { DocumentEntity } from 'core/entities/document.entity';
import { PoliciesUserEntity } from 'core/entities/policies-user.entity';
import { RoleUserEntity } from 'core/entities/role-user.entity';
import { RoleEntity } from 'core/entities/role.entity';
import { UserEntity } from 'core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserServiceService {
  constructor(
  @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleUserEntity) private roleUserRepository: Repository<RoleUserEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
  //   @InjectRepository(PoliciesUserEntity) private policyRepository: Repository<PoliciesUserEntity>,
  //   @InjectRepository(DocumentEntity) private documentRepository: Repository<DocumentEntity>,
    ) { }

  //   async getUser(body: LoginDto): Promise<UserDto | null> {
  //     let user: UserEntity | null = await this.userRepository.createQueryBuilder("user")
  //       .innerJoinAndSelect("user.roles", "roles")
  //       .innerJoinAndSelect("user.policies", "policies")
  //       .innerJoinAndSelect("user.documents", "documents")
  //       .where("user.email = :email", { email: body.email })
  //       .orWhere("user.user_name = :user", { user: body.user })
  //       .getOne();

  //     if (!user) {
  //       return null;
  //     } else {
  //       const userDto: UserDto = {
  //         userName: user.userName,
  //         email: user.email,
  //         role: user.roles.map(r => r.role.role),
  //         policies: user.policies.map(p => p.policy.name),
  //         documents: user.documents?.map(d => d.title) || []
  //       }
  //       return userDto;
  //     }
  //   }

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
      .where("id IN(...:id))", { id: rolesId})
      .getMany();

      let rolesUsers = roles.map(role => {
        let data = new RoleUserEntity();
        data.user = user.userName;
        data.role = role;

        return data;
      })

      await this.roleUserRepository.save(rolesUsers);

      return await this.userRepository.save(user) as UserDto;


    }

  //     await this.roleUserRepository.save(roleUserEntities);
    
  //     return {
  //       userName: user.userName,
  //       email: user.email,
  //       role: singUp.roles,
  //       policies: singUp.policies,
  //       documents: []
  //     }
  //   }

    async getRoles(){
      return this.roleRepository.createQueryBuilder()
      .select()
      .getMany()
    }

    async getUsers(){
      return this.userRepository.createQueryBuilder()
      .select()
      .getMany()
    }

    async getUser(user: LoginDto): Promise<UserDto>{
      let login: UserEntity | null = await this.userRepository.createQueryBuilder("uu")
      .innerJoinAndSelect("uu.roles", "roles")
      .select()
      .where("uu.user_name = :userName", {userName: user.user})
      .orWhere("uu.email = :email", {email: user.email})
      .andWhere("uu.password = :password", {password: user.password})
      .andWhere("uu.pin = :pin", {pin: user.pin})
      .getOne();

      return login as UserDto;
    }
  }