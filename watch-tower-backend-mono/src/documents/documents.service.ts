import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { createDocDTO, documentDto, updateDocDTO } from 'core/dtos/document.dto';
import { DocsActionsEntity } from 'core/entities/docs_actions.entity';
import { DocumentEntity } from 'core/entities/document.entity';
import { UserEntity } from 'core/entities/user.entity';
import bcrypt from 'bcryptjs';
import { Interface } from 'readline';
import { Repository } from 'typeorm';
import { AuditLogEntity } from 'core/entities/audit-logs.entity';
import { UserDto } from 'core/dtos/user.dto';

@Injectable()
export class DocumentsService {

  constructor(
    @InjectRepository(DocumentEntity) private docRepo: Repository<DocumentEntity>,
    @InjectRepository(DocsActionsEntity) private actions: Repository<DocsActionsEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(AuditLogEntity) private auditRepo: Repository<AuditLogEntity>
  ) { }

  async getDocuments(): Promise<documentDto[] | null> {
    try {
      let data: DocumentEntity[] = await this.docRepo
        .createQueryBuilder("doc")
        .innerJoinAndSelect("doc.user", "user")
        .orderBy("doc.updated_at", "DESC")
        .getMany()

      if (data) {
        let docs: documentDto[] = data.map(doc => {
          return {
            id: doc.id,
            title: doc.title,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            owner: doc.user.userName,
            hasPass: doc.password ? true : false,
            content: doc.password ? null : doc.content
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

  async getSpecificDoc(id: number, pass: string, userName: string) {
    try {
      let documents: DocumentEntity | null = await this.docRepo
        .createQueryBuilder("doc")
        .innerJoinAndSelect("doc.user", "user")
        .where("doc.id =:id", { id: id })
        .getOne();

      if (documents?.password == null && documents) {
        let response = {
          id: documents.id,
          title: documents.title,
          content: documents.content,
          owner: documents.user.userName,
          createdAt: documents.createdAt,
          updatedAt: documents.updatedAt
        }

        return response;
      }

      if ((documents?.password == pass ||
        await bcrypt.compare(pass, documents!.password!)) &&
        documents) {

        // await this.registrerAction(documents, documents.user!, "OPEN")
        let response = {
          id: documents.id,
          title: documents.title,
          content: documents.content,
          owner: documents.user.userName,
          createdAt: documents.createdAt,
          updatedAt: documents.updatedAt
        }

        return response;
      }

    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  // private async registrerAction(document: DocumentEntity, user: UserEntity, action: string) {

  //   try {
  //     return await this.actions.createQueryBuilder()
  //       .insert()
  //       .into(DocsActionsEntity)
  //       .values({
  //         doc: document,
  //         user: user,
  //         action: action
  //       })
  //       .execute();
  //   } catch (error: any) {
  //     throw new HttpException(error.message, 500);
  //   }
  // }

  async createDocument(doc: createDocDTO): Promise<documentDto> {
    let crypt = doc.hasPass ? await bcrypt.hash(doc.pass!, 10) : null;
    let document: DocumentEntity = new DocumentEntity();
    document.title = doc.title;
    document.content = doc.content;
    document.password = crypt;
    try {
      let user = await this.userRepo.findOne({
        where: {
          userName: doc.owner
        }
      })

      if (user) {
        document.user = user;

        let docs: DocumentEntity = await this.docRepo.save(document);
        return {
          id: docs.id,
          title: docs.title,
          owner: docs.user.userName,
          createdAt: docs.createdAt,
          updatedAt: docs.updatedAt,
          hasPass: doc.hasPass
        };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error: any) {
      throw new HttpException(error.mesage, 500);
    }

  }

  async updateDoc(update: updateDocDTO, u: UserDto, ip: string, id: number) {
    let user: UserEntity | null = await this.userRepo.findOne({ where: { userName: u.userName } });

    try {
      let doc = await this.docRepo.findOne({ where: { id: id } });

      if ((user && doc) && (u.role![0].id == 1 || doc.user == user)) {
        doc.title = update.title;
        doc.content = update.content;
        doc.password = update.pass;
        doc.updatedAt = new Date();

        let audit: AuditLogEntity = new AuditLogEntity();
        audit.action = "UPDATE_DOCUMENT";
        audit.ip = ip;
        audit.description = "Actualizacion de documento";
        audit.user = user;
        audit.success = true;

        await this.auditRepo.save(audit);
        await this.docRepo.save(doc);
      } else {
        throw new UnauthorizedException();
      }
    } catch (error: any) {
      let audit: AuditLogEntity = new AuditLogEntity();
      audit.action = "UPDATE_DOCUMENT_FAILED";
      audit.ip = ip;
      audit.description = "Actualizacion de documento";
      audit.success = false;
      audit.user = user!;

      await this.auditRepo.save(audit);
      throw new HttpException(error.message, 500);
    }
  }

  async deleteDoc(id: number, ip: string, user: any){
    let u: UserEntity | null = await this.userRepo.findOne({ where: {userName: user.userName}});
    console.log(user);

    try {
      let doc: DocumentEntity | null = await this.docRepo.findOne({where: {id: id}});

      if(doc && (doc.user == u || user?.role[0].id == 1)){

        let audit: AuditLogEntity = new AuditLogEntity();
        audit.action = "DELETE_DOCUMENT";
        audit.ip = ip;
        audit.description = "Eliminacion de documento";
        audit.user = u!;
        audit.success = true;

        await this.auditRepo.save(audit);
        await this.docRepo.delete({id: doc.id});
      } else {
        throw new UnauthorizedException();
      }
      
    } catch (error: any) {
      let audit: AuditLogEntity = new AuditLogEntity();
      audit.action = "DELETE_DOCUMENT_FAILED";
      audit.ip = ip;
      audit.description = "Eliminacion de documento";
      audit.success = false;
      audit.user = u!;

      await this.auditRepo.save(audit);
      throw new HttpException(error.message, 500);
    }
  }

}

