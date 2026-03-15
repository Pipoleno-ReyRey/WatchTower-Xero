import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesDb } from 'core/envs/db-entities.env';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([...entitiesDb])],
  controllers: [AuditController],
  providers: [AuditService, JwtService],
})
export class AuditModule {}
