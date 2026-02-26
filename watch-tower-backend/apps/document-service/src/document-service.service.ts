import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { documentDto } from 'core/dtos/document.dto';
import { DocumentEntity } from 'core/entities/document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentService {
  
  constructor(
    @InjectRepository(DocumentEntity) private docRepo: Repository<DocumentEntity>
  ){}

  async getDocuments(): Promise<DocumentEntity[]>{
    let documents: DocumentEntity[] = await this.docRepo
    .createQueryBuilder("doc")
    .innerJoinAndSelect("doc.user", "user")
    .getMany()

    return documents;
  }

  async getSpecificDoc(): Promise<documentDto>{
    let documents: DocumentEntity[] = await this.docRepo
    .createQueryBuilder("doc")
    .innerJoinAndSelect("doc.user", "user")
    .getMany()

    return documents;
  }
}
