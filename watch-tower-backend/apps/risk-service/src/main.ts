import { NestFactory } from '@nestjs/core';
import { RiskServiceModule } from './risk-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RiskServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
