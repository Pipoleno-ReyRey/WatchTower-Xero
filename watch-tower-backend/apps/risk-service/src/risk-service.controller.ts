import { Controller, Get } from '@nestjs/common';
import { RiskServiceService } from './risk-service.service';

@Controller()
export class RiskServiceController {
  constructor(private readonly riskServiceService: RiskServiceService) {}

  @Get()
  getHello(): string {
    return this.riskServiceService.getHello();
  }
}
