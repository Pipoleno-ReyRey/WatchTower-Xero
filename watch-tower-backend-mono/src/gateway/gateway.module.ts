import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { entitiesDb } from 'core/envs/db-entities.env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([...entitiesDb]),
  ConfigModule.forRoot({isGlobal: true}),
  PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.TOKEN_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    })],
  controllers: [GatewayController],
  providers: [GatewayService, UserService, JwtModule],
})
export class GatewayModule { }
