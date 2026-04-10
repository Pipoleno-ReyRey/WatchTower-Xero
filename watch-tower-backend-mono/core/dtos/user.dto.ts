import { RoleUserEntity } from "core/entities/role-user.entity";
import { RoleEntity } from "core/entities/role.entity";
import { roleDto } from "./role.dto";
import { documentDto } from "./document.dto";

export class UserDto{
    name?: string
    userName?: string;
    email?: string;
    role?: roleDto[];
    documents?: documentDto[];
    token?: string;
    status!: boolean;
}

export class UpdateUser{
    id?: number;
    name!: string;
    userName!: string;
    email!: string;
    // password!: string;
    role!: roleDto;
    pin!: string;
}
