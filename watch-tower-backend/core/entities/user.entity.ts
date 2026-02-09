import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleUserEntity } from "./role-user.entity";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "user_name", type: "varchar", length: 50, nullable: false, unique: true})
    userName!: string;

    @Column({name: "email", type: "varchar", length: 100, nullable: false, unique: true})
    email!: string;

    @Column({name: "password_hash", type: "text", nullable: false})
    password!: string;
    
    @Column({name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false})
    createdAt!: Date;

    @Column({name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", nullable: false})
    updatedAt!: Date;

    @Column({name: "status", type: "boolean", default: true, nullable: false})
    status!: boolean;

    @Column({name: "last_date_login", type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP"})
    lastDateLogin!: Date;

    @OneToMany(() => RoleUserEntity, roleUser => roleUser.user)
    roles!: RoleUserEntity[];
}