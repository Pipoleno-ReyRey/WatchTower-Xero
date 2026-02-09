import { Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";

@Entity("role_user")
export class RoleUserEntity {
    @ManyToOne(() => UserEntity, user => user.roles)
    user!: UserEntity;

    @ManyToMany(() => RoleEntity, role => role.users)
    role!: RoleEntity[];
}