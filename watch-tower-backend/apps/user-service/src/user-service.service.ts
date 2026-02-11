import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'core/dtos/login.dto';
import { signUp } from 'core/dtos/sing.dto';
import { UserDto } from 'core/dtos/user.dto';
import { DocumentEntity } from 'core/entities/document.entity';
import { PoliciesUserEntity } from 'core/entities/policies-user.entity';
import { RoleUserEntity } from 'core/entities/role-user.entity';
import { RoleEntity } from 'core/entities/role.entity';
import { UserEntity } from 'core/entities/user.entity';
import { Repository } from 'typeorm/browser';

@Injectable()
export class UserServiceService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleUserEntity) private roleUserRepository: Repository<RoleUserEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @InjectRepository(PoliciesUserEntity) private policyRepository: Repository<PoliciesUserEntity>,
    @InjectRepository(DocumentEntity) private documentRepository: Repository<DocumentEntity>,
    ) { }

    async getUser(body: LoginDto): Promise<UserDto | null> {
      let user: UserEntity | null = await this.userRepository.createQueryBuilder("user")
        .innerJoinAndSelect("user.roles", "roles")
        .innerJoinAndSelect("user.policies", "policies")
        .innerJoinAndSelect("user.documents", "documents")
        .where("user.email = :email", { email: body.email })
        .orWhere("user.user_name = :user", { user: body.user })
        .getOne();

      if (!user) {
        return null;
      } else {
        const userDto: UserDto = {
          userName: user.userName,
          email: user.email,
          role: user.roles.map(r => r.role.role),
          policies: user.policies.map(p => p.policy.name),
          documents: user.documents?.map(d => d.title) || []
        }
        return userDto;
      }
    }

    async createUser(singUp: signUp): Promise<UserDto> {
      const user = new UserEntity();
      user.name = singUp.name;
      user.userName = singUp.userName;
      user.email = singUp.email;
      user.password = singUp.password;
      user.pin = singUp.pin;
      user.securityQuestion = singUp.securityQuestion;
      user.securityAnswer = singUp.securityAnswer;
      user.email = singUp.email;
      await this.userRepository.save(user);
    
      let roles = await this.roleRepository.createQueryBuilder("role")
      .select([
        "role.id as id",
      ])
      .where("role.role IN (:...roles)", { roles: singUp.roles })
      .getRawMany();
      
      const roleUserEntities = roles.map((role) => {
        const roleUserEntity = new RoleUserEntity();
        roleUserEntity.user = user;
        roleUserEntity.role = role;
        return roleUserEntity;
      });

      await this.roleUserRepository.save(roleUserEntities);
    
      return {
        userName: user.userName,
        email: user.email,
        role: singUp.roles,
        policies: singUp.policies,
        documents: []
      }
    }

  }