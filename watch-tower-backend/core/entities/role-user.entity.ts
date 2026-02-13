import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";

@Entity("user_roles")
export class RoleUserEntity {
    @PrimaryColumn()
    @ManyToOne(() => UserEntity, user => user.userName)
    @JoinColumn({name: "user", referencedColumnName: "userName"})
    user!: string;

    @PrimaryColumn()
    @ManyToOne(() => RoleEntity, role => role.role)
    @JoinColumn({name: "role", referencedColumnName: "id"})
    role!: RoleEntity;
}