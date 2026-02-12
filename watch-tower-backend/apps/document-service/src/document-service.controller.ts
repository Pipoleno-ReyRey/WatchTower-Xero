import { Controller, Get } from '@nestjs/common';
import { DocumentServiceService } from './document-service.service';

@Controller()
export class DocumentServiceController {
  constructor(private readonly documentServiceService: DocumentServiceService) {}

  @Get()
  getHello(): string {
    return this.documentServiceService.getHello();
  }
}
