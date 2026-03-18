import { UserDto } from "./user.dto";

export class documentDto {
    title!: string;
    createdAt!: Date;
    updatedAt!: Date;
    owner!: string;
}

export class createDocDTO{
    title!: string;
    owner?: string;
    content!: string;
    pass!: string;
}