import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { AuditLogDto } from 'core/dtos/audit.dto';
import { AuditLogEntity } from 'core/entities/audit-logs.entity';
import { DocsActionsEntity } from 'core/entities/docs_actions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuditService {
    constructor(
        @InjectRepository(AuditLogEntity) private auditRepo: Repository<AuditLogEntity>,
        @InjectRepository(DocsActionsEntity) private docsActionsRepo: Repository<DocsActionsEntity>
    ){}

    async getAudits(){
        try {
            let logs: AuditLogEntity[] = await this.auditRepo
            .createQueryBuilder("audit")
            .innerJoinAndSelect("audit.user", "user")
            .orderBy("audit.date", "DESC")
            .getMany();

            let response: AuditLogDto[] = logs.map(log => {
                return {
                    userName: log.user.userName,
                    action: log.action,
                    ip: log.ip,
                    date: log.date,
                    description: log.description,
                    success: log.success
                };
            });

            return response;
        } catch (error: any) {
            throw new HttpException(error.message, 500);
        }
    }
}
