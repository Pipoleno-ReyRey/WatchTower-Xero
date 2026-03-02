import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { DocumentService } from './document-service.service';
import { DocumentEntity } from 'core/entities/document.entity';
import { documentDto } from 'core/dtos/document.dto';
import { AuthGuard } from 'core/guards/auth.guard';

@Controller("docs")
@UseGuards(AuthGuard)
export class DocumentController {
  constructor(private readonly DocumentService: DocumentService) {}

  @Get()
  async documents(@Req() req): Promise<DocumentEntity[]> 
  {
    console.log(req.info);
    return await this.DocumentService.getDocuments();
  }

  @Get("get-specific-doc")
  async getDoc(@Query("title") title: string, @Query("pass") pass: string, @Req() req){
    console.log(title, pass);
    return await this.DocumentService.getSpecificDoc(title, pass, req.info.userName);
  }
}
