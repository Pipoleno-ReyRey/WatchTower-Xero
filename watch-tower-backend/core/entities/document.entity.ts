import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("documents")
export class DocumentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "title", type: "varchar", nullable: false})
    title!: string;

    @Column({name: "content", type: "text", nullable: false})
    content!: string;

    @Column({name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt!: Date;

    @ManyToOne(() => UserEntity, user => user.documents)
    @JoinColumn({name: "user", referencedColumnName: "userName"})
    user!: UserEntity;

    @Column({name: "password", type: "varchar", nullable: true})
    password!: string;
}