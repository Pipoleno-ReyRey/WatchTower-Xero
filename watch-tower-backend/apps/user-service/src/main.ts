import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  app.enableCors();
  await app.listen(process.env.USER_SERVICE_PORT ?? 3000);
}
bootstrap();
