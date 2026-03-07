import { Module } from '@nestjs/common';
import { UsersController } from './users-gateway/users.controller';
import { UsersGatewayService } from './users-gateway/users-gateway.service';
import { ConfigModule } from '@nestjs/config';
import { DocsGatewayController } from './docs-gateway/docs-gateway.controller';
import { DocsGatewayService } from './docs-gateway/docs-gateway.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true})],
  controllers: [UsersController, DocsGatewayController,],
  providers: [UsersGatewayService, DocsGatewayService],
})
export class GatewayModule {}
