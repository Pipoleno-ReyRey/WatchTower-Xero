import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("blacklist")
export class BlackListEntity {
  
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "ip", type: "varchar", length: 255, nullable: false })
  ip!: string;

  @Column({ name: "reason", type: "varchar", length: 255, nullable: true })
  reason?: string;

  @Column({ name: "created_at", type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ name: "active", type: "boolean", default: true })
  active!: boolean;
}