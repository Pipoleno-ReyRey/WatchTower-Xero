import { RoleUserEntity } from "core/entities/role-user.entity";

export class UserDto{
    userName?: string;
    email?: string;
    role?: RoleUserEntity[];
    policies?: string[];
    documents?: string[];
}