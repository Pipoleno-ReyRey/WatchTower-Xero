import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuthGuard } from 'core/guards/auth.guard';
import { AuditLogDto } from 'core/dtos/audit.dto';

@Controller('audit')
@UseGuards(AuthGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get("logs")
  async getLogs(@Req() req: any): Promise<AuditLogDto[]> {
    if(req.info.role[0].id == 3 || req.info.role[0].id == 1){
      return await this.auditService.getAudits();
    } else {
      throw new UnauthorizedException();
    }
    
  }
}
