import { Controller, Get, HttpException, Query, Req, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { AuthGuard } from 'core/guards/auth.guard';
import { documentDto } from 'core/dtos/document.dto';

@Controller("doc")
@UseGuards(AuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get("all")
  async documents(@Req() req): Promise<documentDto[]> {
    let response: documentDto[] | null = await this.documentsService.getDocuments();
    if(response){
      return response;
    } else {
      throw new HttpException("no docs founded", 400);
    }
  }

  @Get()
  async getDoc(@Query("title") title: string, @Query("pass") pass: string, @Req() req){
    return await this.documentsService.getSpecificDoc(title, pass, req.info.userName);
  }
}
