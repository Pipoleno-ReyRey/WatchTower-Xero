import { AuditLogEntity } from "core/entities/audit-logs.entity";
import { PoliciesUserEntity } from "core/entities/policies-user.entity";
import { PolicyEntity } from "core/entities/policies.entity";
import { RoleUserEntity } from "core/entities/role-user.entity";
import { RoleEntity } from "core/entities/role.entity";
import { SessionEntity } from "core/entities/sessions.entity";
import { UserEntity } from "core/entities/user.entity";

export const dbEnvs = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "watchtower",
    entities: [UserEntity, SessionEntity, RoleEntity, RoleUserEntity, PolicyEntity, PoliciesUserEntity, AuditLogEntity],
}