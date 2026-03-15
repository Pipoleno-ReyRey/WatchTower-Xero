import { Session } from "@nestjs/common";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SessionEntity } from "./sessions.entity";
import { UserEntity } from "./user.entity";

@Entity("audit_logs")
export class AuditLogEntity {

    @PrimaryGeneratedColumn({name: "id"})
    id!: number;

    @ManyToOne(() => UserEntity, user => user.audit)
    @JoinColumn({referencedColumnName: "userName", name: "user"})
    user!: UserEntity;

    @Column({name: "action", type: "varchar", length: 255, nullable: false})
    action!: string;

    @Column({name: "ip", type: "varchar", length: 255, nullable: false})
    ip!: string;

    @Column({name: "date", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false})
    date!: Date;
} 