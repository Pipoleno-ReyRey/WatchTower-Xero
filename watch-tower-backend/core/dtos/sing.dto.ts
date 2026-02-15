import { RoleEntity } from "core/entities/role.entity";
import { roleDto } from "./role.dto";

export class signIn{
    name!: string;
    userName!: string;
    email!: string;
    password!: string;
    pin!: string;
    roles!: roleDto[];
    policies?: string[];
    securityQuestion?: string;
    securityAnswer?: string;
}