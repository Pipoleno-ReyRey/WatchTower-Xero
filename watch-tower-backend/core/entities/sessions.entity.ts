import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("sessions")
export class SessionEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id?: number;

    @Column({ name: "ip_address", type: "varchar", nullable: false, length: 100 })
    ipAddress!: string;

    @Column({ name: "action" })
    action!: string;

    @Column({ name: "status", type: "boolean", default: true, nullable: false })
    status!: boolean;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    createdAt?: Date;

    @Column({ name: "ended_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    endedAt?: Date;

    @OneToOne(() => UserEntity, user => user.userName)
    @JoinColumn({ name: "user", referencedColumnName: "userName" })
    user!: UserEntity;

}