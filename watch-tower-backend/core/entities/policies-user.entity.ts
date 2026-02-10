import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { PolicyEntity } from "./policies.entity";

@Entity("policies_users")
export class PoliciesUserEntity {

    @ManyToOne(() => UserEntity, user => user.policies)
    @JoinColumn({name: "user", referencedColumnName: "user_name"})
    user!: UserEntity;

    @ManyToOne(() => PolicyEntity, policy => policy.users)
    @JoinColumn({name: "policy", referencedColumnName: "id"})
    policy!: PolicyEntity;

}