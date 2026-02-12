import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";

@Entity("role_user")
export class RoleUserEntity {
    @ManyToOne(() => UserEntity, user => user.roles)
    @JoinColumn({name: "user", referencedColumnName: "user_name"})
    user!: UserEntity;

    @ManyToOne(() => RoleEntity, role => role.users)
    @JoinColumn({name: "role", referencedColumnName: "id"})
    role!: RoleEntity;
}