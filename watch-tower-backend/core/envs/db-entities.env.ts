import { AuditLogEntity } from "core/entities/audit-logs.entity";
import { DocumentEntity } from "core/entities/document.entity";
import { PoliciesUserEntity } from "core/entities/policies-user.entity";
import { PolicyEntity } from "core/entities/policies.entity";
import { RoleUserEntity } from "core/entities/role-user.entity";
import { RoleEntity } from "core/entities/role.entity";
import { SessionEntity } from "core/entities/sessions.entity";
import { UserEntity } from "core/entities/user.entity";

export const entitiesDb = [
    UserEntity,
    RoleEntity,
    AuditLogEntity,
    PoliciesUserEntity,
    PolicyEntity,
    RoleUserEntity,
    SessionEntity,
    DocumentEntity
]