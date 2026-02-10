import { Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";

@Entity("role_user")
export class RoleUserEntity {
    @ManyToOne(() => UserEntity, user => user.roles)
    @JoinColumn({name: "user", referencedColumnName: "user_name"})
    user!: UserEntity;

    @ManyToMany(() => RoleEntity, role => role.users)
    @JoinColumn({name: "role", referencedColumnName: "id"})
    role!: RoleEntity;
}