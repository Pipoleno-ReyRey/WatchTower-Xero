import { RoleUserEntity } from "core/entities/role-user.entity";
import { RoleEntity } from "core/entities/role.entity";
import { roleDto } from "./role.dto";
import { documentDto } from "./document.dto";

export class UserDto{
    userName?: string;
    email?: string;
    role?: roleDto[];
    policies?: string[];
    documents?: documentDto[];
}