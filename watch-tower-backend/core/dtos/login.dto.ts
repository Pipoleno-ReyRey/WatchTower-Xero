export class LoginDto {
  email?: string;
  user?: string;
  password!: string;
  pin?: string;
  securityQuestion?: string;
  securityAnswer?: string;
}