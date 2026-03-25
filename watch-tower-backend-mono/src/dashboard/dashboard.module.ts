import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesDb } from 'core/envs/db-entities.env';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([...entitiesDb])],
  controllers: [DashboardController],
  providers: [DashboardService, JwtService],
})
export class DashboardModule {}
