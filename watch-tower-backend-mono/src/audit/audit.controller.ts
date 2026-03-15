import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuthGuard } from 'core/guards/auth.guard';
import { AuditLogDto } from 'core/dtos/audit.dto';

@Controller('audit')
@UseGuards(AuthGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get("logs")
  async getLogs(): Promise<AuditLogDto[]> {
    return await this.auditService.getAudits();
  }
}
