import { Body, Controller, Get, HttpException, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
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

  @Post()
  async getDoc(@Body() doc: any, @Req() req){
    return await this.documentsService.getSpecificDoc(doc.title, doc.pass, req.info.userName);
  }
}
