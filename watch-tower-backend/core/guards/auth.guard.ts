import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'apps/auth-service/src/auth-service.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  async canActivate(
    context: ExecutionContext,
  ) {
    let request = context.switchToHttp().getRequest();
    let token = request.headers["token"]
    if (token === "") {
      throw new UnauthorizedException;
    }

    try {
      let valid = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET
      });

      request.info = valid;
      return valid;
      
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }
}
