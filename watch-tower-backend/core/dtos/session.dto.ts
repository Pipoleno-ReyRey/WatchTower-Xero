import { IsString, IsBoolean, IsOptional, IsIP, IsIn } from "class-validator";

export class SessionDto {
    @IsString()
    ip!: string;

  @IsString()
  @IsIn(["LOGIN", "LOGOUT", "REGISTER", "UPDATE"]) 
  action!: string;

  @IsBoolean()
  status!: boolean;

  @IsOptional()
  @IsString()
  user?: string;
}
