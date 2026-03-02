import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { documentDto } from 'core/dtos/document.dto';
import { DocsActionsEntity } from 'core/entities/docs_actions.entity';
import { DocumentEntity } from 'core/entities/document.entity';
import { UserEntity } from 'core/entities/user.entity';
import bcrypt from 'node_modules/bcryptjs/';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentService {
  
  constructor(
    @InjectRepository(DocumentEntity) private docRepo: Repository<DocumentEntity>,
    @InjectRepository(DocsActionsEntity) private actions: Repository<DocsActionsEntity>,
    @InjectRepository(UserEntity) private  userRepo: Repository<UserEntity>
  ){}

  async getDocuments(): Promise<DocumentEntity[]>{
    let documents: DocumentEntity[] = await this.docRepo
    .createQueryBuilder("doc")
    .innerJoinAndSelect("doc.user", "user")
    .getMany()

    return documents;
  }

  async getSpecificDoc(title: string, pass: string, userName: string){
    let documents: DocumentEntity | null = await this.docRepo
    .createQueryBuilder("doc")
    .innerJoinAndSelect("doc.user", "user")
    .where("doc.title LIKE :title", { title: `%${title}%` })
    .getOne();

    if(pass && documents){
      let encrypt = await bcrypt.hash(pass, 12);
      console.log(encrypt);
      let comparePass = await bcrypt.compare(pass, documents!.password);
      if(comparePass){
        let user: UserEntity | null = await this.userRepo
        .createQueryBuilder()
        .select()
        .where("user_name = :user", {user: userName})
        .getOne();

        if(!user){
          throw new HttpException("user not found", 404);
        } else {
          await this.registrerAction(documents, user, "OPEN");
          return documents as documentDto;
        }
      }
    } else {
      throw new HttpException("document not found", 404);
    }
  }

  private async registrerAction(document: DocumentEntity, user: UserEntity, action: string){
    
    return await this.actions.createQueryBuilder()
    .insert()
    .into(DocsActionsEntity)
    .values({
      doc: document,
      user: user,
      action: action
    })
    .execute();
  }

}
