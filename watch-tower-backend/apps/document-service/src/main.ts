import { NestFactory } from '@nestjs/core';
import { DocumentServiceModule } from './document-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DocumentServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
