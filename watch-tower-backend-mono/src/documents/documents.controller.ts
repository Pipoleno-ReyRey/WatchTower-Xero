import { Body, Controller, Get, HttpException, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { AuthGuard } from 'core/guards/auth.guard';
import { createDocDTO, documentDto } from 'core/dtos/document.dto';

@Controller("doc")
@UseGuards(AuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get("all")
  async documents(@Req() req): Promise<documentDto[] | null> {
    let response: documentDto[] | null = await this.documentsService.getDocuments();
    return response;
  }

  @Post("/:id")
  async getDoc(@Param("id") id: number, @Body() pass, @Req() req){
    return await this.documentsService.getSpecificDoc(id, pass.pass, req.info.userName);
  }

  @Post("/new/create")
  async createDoc(@Body() doc: createDocDTO, @Req() req){
    doc.owner = req.info.userName;
    return await this.documentsService.createDocument(doc);
  }
}
