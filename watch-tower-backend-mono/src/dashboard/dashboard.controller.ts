import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'core/guards/auth.guard';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard(@Req() req) {
    if(req.info.role[0].role == "admin"){
      return await this.dashboardService.getDashboard();
    } else {
      throw new UnauthorizedException();
    }
  }
}
