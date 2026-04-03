export class DashboardDto {
    totalUsers!: number;
    totalDocuments!: number;
    roles!: Roles[];
    totalRoles!: number;
    activeUsers!: ActiveUser[];
    lastLogs!: LastLogs[];
    blockedIps!: string[];
}

export class ActiveUser{
    userName!: string;
    email!: string;
    risk!: string;
    status!: boolean;
}

export class LastLogs{
    user!: string;
    action!: string;
    description!: string;
    ip!: string;
    date!: Date;
    success!: boolean;
}

export class Roles{
    role!: string;
    users!: number;
}