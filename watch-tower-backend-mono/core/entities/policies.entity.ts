import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PoliciesUserEntity } from "./policies-user.entity";

@Entity("policies")
export class PolicyEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "name", type: "varchar", length: 100, nullable: false, unique: true})
    name!: string;

    @Column({name: "attributes", type: "text", nullable: false})
    attributes!: string;

    @Column({name: "condition", type: "varchar", nullable: false, length: 255})
    condition!: string;

    @OneToMany(() => PoliciesUserEntity, policiesUser => policiesUser.policy)
    @JoinColumn({name: "id"})
    users!: PoliciesUserEntity[];
}