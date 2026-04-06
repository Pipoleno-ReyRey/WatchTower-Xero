import { UserDto } from "./user.dto";

export class documentDto {
    id!: number
    title!: string;
    content?: string | null;
    createdAt!: Date;
    updatedAt!: Date;
    owner!: string;
    hasPass!: boolean;
}

export class createDocDTO{
    title!: string;
    owner?: string;
    content!: string;
    hasPass!: boolean;
    pass?: string | null;
}

export class updateDocDTO{
    title!: string;
    content!: string;
    hassPass?: boolean;
    pass?: string | null;
}