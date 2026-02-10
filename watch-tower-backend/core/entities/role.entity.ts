import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleUserEntity } from "./role-user.entity";

@Entity("roles")
export class RoleEntity {
  
    @PrimaryGeneratedColumn({name: "id"})
    id!: number;

    @Column({name: "name", type: "varchar", length: 100, nullable: false, unique: true})
    role!: string;

    @Column({name: "description", type: "text", nullable: true})
    description!: string;

    @OneToMany(() => RoleUserEntity, roleUser => roleUser.role)
    @Column({name: "id", type: "int", nullable: false})
    @JoinColumn({name: "id", referencedColumnName: "role"})
    users!: RoleUserEntity[];
}