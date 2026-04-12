import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUser, LastLogs, Roles } from 'core/dtos/dashboard.dto';
import { AuditLogEntity } from 'core/entities/audit-logs.entity';
import { BlackListEntity } from 'core/entities/black-list.entity';
import { DocumentEntity } from 'core/entities/document.entity';
import { RoleEntity } from 'core/entities/role.entity';
import { UserEntity } from 'core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(DocumentEntity) private readonly docRepo: Repository<DocumentEntity>,
        @InjectRepository(RoleEntity) private readonly roleRepo: Repository<RoleEntity>,
        @InjectRepository(AuditLogEntity) private readonly auditRepo: Repository<AuditLogEntity>,
        @InjectRepository(BlackListEntity) private readonly blackListRepo: Repository<BlackListEntity>) { }

    private async users() {
        try {
            let data = await this.userRepo.createQueryBuilder("user")
                .innerJoinAndSelect("user.audit", "audit")
                .getMany();

            let activeUsers = data.map(u => {
                if (u.status) {
                    return {
                        userName: u.userName,
                        email: u.email,
                        risk: `${u.audit.filter(l => l.action == "LOGIN_FAILED").length * 5}%`,
                        status: u.status
                    } as ActiveUser
                }
            });

            let amount = data.length;
            return {
                totalUsers: amount,
                activeUsers: activeUsers.length > 0 ? activeUsers : []
            }

        } catch (error: any) {
            throw new HttpException(error.message, 500);
        }
    }

    private async docs() {
        try {
            let data = await this.docRepo.findAndCount();

            return {
                totalDocuments: data[1]
            }
        } catch (error: any) {
            throw new HttpException(error.message, 500);
        }
    }

    private async roles() {
        try {
            let roles = await this.roleRepo.createQueryBuilder("roles")
                .leftJoinAndSelect("roles.users", "users")
                .getManyAndCount();

            return {
                totalRoles: roles[1],
                roles: roles[0].map(r => {
                    return {
                        role: r.role,
                        users: r.users?.length
                    } as Roles
                }
                )
            }
        } catch (error: any) {
            throw new HttpException(error.message, 500);
        }
    }

    private async logs() {
        try {
            let logs = await this.auditRepo
                .createQueryBuilder("logs")
                .innerJoinAndSelect("logs.user", "user")
                .orderBy("logs.date", "DESC")
                .getMany();

            logs = logs.slice(0, 3);

            let blockedIPs = await this.blackListRepo.find();

            return {
                lastLogs: logs.map(l => {
                    return {
                        user: l.user.userName,
                        action: l.action,
                        ip: l.ip,
                        description: l.description,
                        success: l.success,
                        date: new Date(l.date)
                    } as LastLogs
                }),
                blockedIps: blockedIPs.map(i => i.ip)
            }
            
        } catch (error: any) {
            throw new HttpException(error.message, 500);
        }
    }

    async getDashboard() {
        try {
            let users = await this.users();

            let docs = await this.docs();

            let roles = await this.roles();

            let logs = await this.logs();

            return {
                ...users,
                ...docs,
                ...roles,
                ...logs
            }
        } catch (error: any) {
            throw new HttpException(error.message, 500);
        }
    }
}
