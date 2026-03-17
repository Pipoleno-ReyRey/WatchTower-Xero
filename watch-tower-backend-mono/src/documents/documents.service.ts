import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { createDocDTO, documentDto } from 'core/dtos/document.dto';
import { DocsActionsEntity } from 'core/entities/docs_actions.entity';
import { DocumentEntity } from 'core/entities/document.entity';
import { UserEntity } from 'core/entities/user.entity';
import bcrypt from 'bcryptjs';
import { Interface } from 'readline';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentsService {

  constructor(
    @InjectRepository(DocumentEntity) private docRepo: Repository<DocumentEntity>,
    @InjectRepository(DocsActionsEntity) private actions: Repository<DocsActionsEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
  ) { }

  async getDocuments(): Promise<documentDto[] | null> {
    try {
      let data: DocumentEntity[] = await this.docRepo
        .createQueryBuilder("doc")
        .innerJoinAndSelect("doc.user", "user")
        .getMany()

      if (data) {
        let docs: documentDto[] = data.map(doc => {
          return {
            title: doc.title,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            owner: doc.user.userName
          } as documentDto;
        })

        return docs;
      } else {
        return null;
      }
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async getSpecificDoc(title: string, pass: string, userName: string) {
    let documents: DocumentEntity | null = await this.docRepo
      .createQueryBuilder("doc")
      .innerJoinAndSelect("doc.user", "user")
      .where("doc.title LIKE :title", { title: `%${title}%` })
      .getOne();

    if (documents?.password == pass) {
      let user: UserEntity | null = await this.userRepo
        .createQueryBuilder()
        .select()
        .where("user_name = :user", { user: userName })
        .getOne();

      await this.registrerAction(documents, user!, "OPEN")
      return {
        title: documents.title,
        content: documents.content,
        owner: documents.user.userName,
        createdAt: documents.createdAt,
        updatedAt: documents.updatedAt
      }
    }
  }

  private async registrerAction(document: DocumentEntity, user: UserEntity, action: string) {

    try {
      return await this.actions.createQueryBuilder()
        .insert()
        .into(DocsActionsEntity)
        .values({
          doc: document,
          user: user,
          action: action
        })
        .execute();
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async createDocument(doc: createDocDTO): Promise<documentDto> {
    let crypt: string = await bcrypt.hash(doc.pass, 10);
    let document: DocumentEntity = new DocumentEntity();
    document.title = doc.title;
    document.content = doc.content;
    document.password = crypt;
    let user = await this.userRepo.findOne({
      where: {
        userName: doc.owner
      }
    })

    if(user){
      document.user = user;

      let docs: DocumentEntity = await this.docRepo.save(document);
      return {
        title: docs.title,
        owner: docs.user.userName,
        createdAt: docs.createdAt,
        updatedAt: docs.updatedAt
      };
    } else {
      throw new HttpException("user not found", 401);
    }
    
  }

}

