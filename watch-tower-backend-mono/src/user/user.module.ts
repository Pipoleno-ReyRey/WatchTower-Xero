import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesDb } from 'core/envs/db-entities.env';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([...entitiesDb])],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule { }
