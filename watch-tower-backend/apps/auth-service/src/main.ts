import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  app.enableCors();
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
