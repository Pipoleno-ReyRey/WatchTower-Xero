import { Module } from '@nestjs/common';
import { RiskServiceController } from './risk-service.controller';
import { RiskServiceService } from './risk-service.service';

@Module({
  imports: [],
  controllers: [RiskServiceController],
  providers: [RiskServiceService],
})
export class RiskServiceModule {}
