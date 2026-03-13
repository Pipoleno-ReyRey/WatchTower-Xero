import { Controller, Get, HttpException, Query, Req, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { AuthGuard } from 'core/guards/auth.guard';
import { documentDto } from 'core/dtos/document.dto';

@Controller("doc")
@UseGuards(AuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get("all")
  async documents(@Req() req): Promise<documentDto[] | null> {
    let response: documentDto[] | null = await this.documentsService.getDocuments();
    return response;
  }

  @Get()
  async getDoc(@Query("title") title: string, @Query("pass") pass: string, @Req() req){
    return await this.documentsService.getSpecificDoc(title, pass, req.info.userName);
  }
}
