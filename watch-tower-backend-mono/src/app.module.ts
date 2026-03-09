import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesDb } from 'core/envs/db-entities.env';
import { UserModule } from './user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "watchtower",
      entities: [...entitiesDb],
    }),
    TypeOrmModule.forFeature([...entitiesDb]),
    UserModule,
    GatewayModule,
  JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
