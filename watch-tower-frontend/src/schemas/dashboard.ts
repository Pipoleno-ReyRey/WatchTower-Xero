import type { IUser } from "./user";
// import type { Role } from "./role";

export interface ILog {
  user: string;
  action: string;
  ip: string;
  date: string; 
}

export interface IDashboardRole {
  role: string;
  users: number;
}

export interface IDashboard {
  totalUsers: number;

  activeUsers: IUser[];

  totalDocuments: number;

  totalRoles: number;

  roles: IDashboardRole[];

  lastLogs: ILog[];

  blockedIps: string[];
}