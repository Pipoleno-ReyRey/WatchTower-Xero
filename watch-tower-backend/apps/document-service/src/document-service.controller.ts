import { Controller, Get, HttpException, Query, Req, UseGuards } from '@nestjs/common';
import { DocumentService } from './document-service.service';
import { DocumentEntity } from 'core/entities/document.entity';
import { documentDto } from 'core/dtos/document.dto';
import { AuthGuard } from 'core/guards/auth.guard';

@Controller("docs")
@UseGuards(AuthGuard)
export class DocumentController {
  constructor(private readonly DocumentService: DocumentService) {}

  @Get()
  async documents(@Req() req): Promise<documentDto[]> {
    let response: documentDto[] | null = await this.DocumentService.getDocuments();
    if(response){
      return response;
    } else {
      throw new HttpException("no docs founded", 404);
    }
  }

  @Get("get-specific-doc")
  async getDoc(@Query("title") title: string, @Query("pass") pass: string, @Req() req){
    return await this.DocumentService.getSpecificDoc(title, pass, req.info.userName);
  }
}
