import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleUserEntity } from "./role-user.entity";
import { PoliciesUserEntity } from "./policies-user.entity";
import { DocumentEntity } from "./document.entity";

@Entity("users")
export class UserEntity {
    
    @PrimaryGeneratedColumn({name: "id"})
    id!: number;

    @Column({name: "name", type: "varchar", length: 255, nullable: false, unique: false})
    name!: string;

    @Column({name: "user_name", type: "varchar", length: 50, nullable: false, unique: true})
    userName!: string;

    @Column({name: "email", type: "varchar", length: 100, nullable: false, unique: true})
    email!: string;

    @Column({name: "password", type: "text", nullable: false})
    password!: string;

    @Column({name: "pin", type: "varchar", length: 6, nullable: false})
    pin!: string;
    
    @Column({name: "security_question", type: "varchar", length: 255, nullable: true})
    securityQuestion?: string;

    @Column({name: "security_answer", type: "varchar", length: 255, nullable: true})
    securityAnswer?: string;

    @Column({name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false})
    createdAt!: Date;

    @Column({name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", nullable: false})
    updatedAt!: Date;

    @Column({name: "status", type: "boolean", default: true, nullable: false})
    status!: boolean;

    @Column({name: "last_date_login", type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP"})
    lastDateLogin!: Date;

    @OneToMany(() => RoleUserEntity, roleUser => roleUser.user)
    @JoinColumn({name: "user_name"})
    roles!: RoleUserEntity[];

    // @OneToMany(() => PoliciesUserEntity, policiesUser => policiesUser.user)
    // @JoinColumn({name: "user_name"})
    // policies!: PoliciesUserEntity[];

    // @OneToMany(() => DocumentEntity, document => document.user)
    // @JoinColumn({name: "user_name"})
    // documents?: DocumentEntity[];

}