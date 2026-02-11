import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'core/entities/role.entity';
import { UserEntity } from 'core/entities/user.entity';
import { Repository } from 'typeorm/browser';

@Injectable()
export class UserServiceService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>) { }

}
