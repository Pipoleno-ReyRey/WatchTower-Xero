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
    ip!: string;
    date!: Date;
}

export class Roles{
    role!: string;
    users!: number;
}