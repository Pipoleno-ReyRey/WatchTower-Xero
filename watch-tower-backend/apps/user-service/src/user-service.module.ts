import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { AuditLogEntity } from "core/entities/audit-logs.entity";
import { PoliciesUserEntity } from "core/entities/policies-user.entity";
import { PolicyEntity } from "core/entities/policies.entity";
import { RoleUserEntity } from "core/entities/role-user.entity";
import { RoleEntity } from "core/entities/role.entity";
import { SessionEntity } from "core/entities/sessions.entity";
import { UserEntity } from "core/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "watchtower",
    entities: [UserEntity, SessionEntity, RoleEntity, RoleUserEntity, PolicyEntity, PoliciesUserEntity, AuditLogEntity],

  })],
=======
import { entitiesDb } from 'core/envs/db-entities.env';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!.toString()) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: entitiesDb
  }), TypeOrmModule.forFeature(entitiesDb)],
>>>>>>> 079373c7bd3d193e66fe58512ae58eea891ebec6
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule { }
