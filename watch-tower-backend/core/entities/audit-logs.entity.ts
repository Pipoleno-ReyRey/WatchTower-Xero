import { Session } from "@nestjs/common";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SessionEntity } from "./sessions.entity";
import { UserEntity } from "./user.entity";

@Entity("audit_logs")
export class AuditLogEntity {

    @PrimaryGeneratedColumn({name: "id"})
    id!: number;

    @Column({name: "user_name", type: "varchar", length: 50, nullable: false})
    @OneToOne(() => UserEntity, user => user.userName)
    @JoinColumn({referencedColumnName: "user_name"})
    userName!: string;

    @Column({name: "session", type: "int", nullable: false})
    @OneToOne(() => SessionEntity, session => session.id)
    @JoinColumn({referencedColumnName: "id"})
    sessionId!: number;

    @Column({name: "action", type: "varchar", length: 255, nullable: false})
    action!: string;

    @Column({name: "timestamp", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false})
    timestamp!: Date;
} 