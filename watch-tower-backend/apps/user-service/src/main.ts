import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  await app.listen(process.env.USER_SERVICE_PORT ?? 3000);
<<<<<<< HEAD
  console.log(process.env.USER_SERVICE_PORT);
=======
>>>>>>> 079373c7bd3d193e66fe58512ae58eea891ebec6
}
bootstrap();
