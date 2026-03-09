import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'core/dtos/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GatewayService {
    constructor(private readonly userService: UserService,
        private jwt: JwtService
    ) { }

    async generateToken(login: LoginDto) {
            let user = await this.userService.getUser(login);

            let response = {
                userName: user.userName,
                email: user.email,
                role: user.role
            }

            return {
                ...response,
                token: this.jwt.sign(response)
            }
    }
}
