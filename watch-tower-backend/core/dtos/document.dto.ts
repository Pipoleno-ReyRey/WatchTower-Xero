import { UserDto } from "./user.dto";

export class documentDto {
    title!: string;
    content!: string;
    createdAt!: Date;
    updatedAt!: Date;
    owner!: string;
}