import { Test, TestingModule } from '@nestjs/testing';
import { RiskServiceController } from './risk-service.controller';
import { RiskServiceService } from './risk-service.service';

describe('RiskServiceController', () => {
  let riskServiceController: RiskServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RiskServiceController],
      providers: [RiskServiceService],
    }).compile();

    riskServiceController = app.get<RiskServiceController>(RiskServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(riskServiceController.getHello()).toBe('Hello World!');
    });
  });
});
