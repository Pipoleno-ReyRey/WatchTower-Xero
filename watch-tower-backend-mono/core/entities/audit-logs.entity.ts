import { Session } from "@nestjs/common";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SessionEntity } from "./sessions.entity";
import { UserEntity } from "./user.entity";

@Entity("audit_logs")
export class AuditLogEntity {

    @PrimaryGeneratedColumn({name: "id"})
    id!: number;

    @Column({name: "user_name", type: "varchar", length: 50, nullable: false})
    userName!: string;

    @OneToOne(() => UserEntity, user => user.userName)
    @JoinColumn({referencedColumnName: "user_name"})
    user!: UserEntity;

    @Column({name: "session", type: "int", nullable: false})
    sessionId!: number;

    @OneToOne(() => SessionEntity, session => session.id)
    @JoinColumn({referencedColumnName: "id"})
    session!: SessionEntity;

    @Column({name: "action", type: "varchar", length: 255, nullable: false})
    action!: string;

    @Column({name: "date", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false})
    date!: Date;
} 