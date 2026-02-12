import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("sessions")
export class SessionEntity {

    @PrimaryGeneratedColumn({ name: "id" })
    id!: number;

    @Column({ name: "ip_address", type: "varchar", nullable: false, length: 100 })
    ipAddress!: string;

    @Column({ name: "action" })
    action!: string;

    @Column({ name: "device_info", type: "text", nullable: false })
    deviceInfo!: string;

    @Column({ name: "status", type: "boolean", default: true, nullable: false })
    status!: boolean;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    createdAt!: Date;

    @Column({ name: "ended_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    endedAt!: Date;

    @Column({ name: "user", type: "varchar", length: 50, nullable: false })
    userName!: string;

    @OneToOne(() => UserEntity, user => user.userName)
    @JoinColumn({ name: "user", referencedColumnName: "user_name" })
    user!: UserEntity;

}