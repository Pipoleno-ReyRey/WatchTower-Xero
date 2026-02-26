import { Controller, Get } from '@nestjs/common';
import { DocumentService } from './document-service.service';
import { DocumentEntity } from 'core/entities/document.entity';
import { documentDto } from 'core/dtos/document.dto';

@Controller("docs")
export class DocumentController {
  constructor(private readonly DocumentService: DocumentService) {}

  @Get()
  async documents(): Promise<DocumentEntity[]> {
    return await this.DocumentService.getDocuments();
  }

  @Get("get-specific-doc/:pass")
  async getDoc(): Promise<documentDto>{
    
  }
}
