import { Module } from '@nestjs/common';
import { DocumentController } from './document-service.controller';
import { DocumentService } from './document-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'core/entities/user.entity';
import { DocumentEntity } from 'core/entities/document.entity';
import { ConfigModule } from '@nestjs/config';
import { entitiesDb } from 'core/envs/db-entities.env';

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
    TypeOrmModule.forFeature([...entitiesDb])
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentServiceModule { }
