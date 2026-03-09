import { IsEmail, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { SessionDto } from "./session.dto";

export class LoginDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  user?: string;

  @IsString()
  @MinLength(1)
  password!: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(6)
  pin?: string;

  @IsString()
  @IsOptional()
  securityQuestion?: string;

  @IsString()
  @IsOptional()
  securityAnswer?: string;

  @IsOptional()
  @ValidateNested()
  session?: SessionDto;
}