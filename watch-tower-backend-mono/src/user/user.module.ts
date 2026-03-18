import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesDb } from 'core/envs/db-entities.env';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([...entitiesDb]),
  ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
  JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
  })],
  controllers: [UserController],
  providers: [UserService, JwtModule],
})
export class UserModule { }
