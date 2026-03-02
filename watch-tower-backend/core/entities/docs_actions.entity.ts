import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DocumentEntity } from "./document.entity";
import { UserEntity } from "./user.entity";

@Entity("docs_actions")
export class DocsActionsEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "action",type: "varchar", nullable: false})
    action!: string;

    @ManyToOne(() => DocumentEntity, doc => doc.id)
    @JoinColumn({name: "doc", referencedColumnName: "id"})
    doc!: DocumentEntity

    @ManyToOne(() => UserEntity, user => user.userName)
    @JoinColumn({name: "user", referencedColumnName: "userName"})
    user!: UserEntity
}