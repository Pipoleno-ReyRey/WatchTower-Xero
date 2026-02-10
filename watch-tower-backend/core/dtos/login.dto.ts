export class LoginDto{
    user!: string;
    password!: string;
    pin?: string;
    securityQuestion?: string;
    securityAnswer?: string;
}