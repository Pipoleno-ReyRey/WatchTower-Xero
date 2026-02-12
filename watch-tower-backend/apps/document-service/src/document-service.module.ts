import { Module } from '@nestjs/common';
import { DocumentServiceController } from './document-service.controller';
import { DocumentServiceService } from './document-service.service';

@Module({
  imports: [],
  controllers: [DocumentServiceController],
  providers: [DocumentServiceService],
})
export class DocumentServiceModule {}
