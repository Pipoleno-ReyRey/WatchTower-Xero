import type { IUserResumen } from "./user";
// import type { Role } from "./role";

export interface ILog {
  user: string;
  action: string;
  ip: string;
  date: string; 
  description: string;
}

export interface IDashboardRole {
  role: string;
  users: number;
}

export interface IDashboard {
  totalUsers: number;

  activeUsers: IUserResumen[];

  totalDocuments: number;

  totalRoles: number;

  roles: IDashboardRole[];

  lastLogs: ILog[];

  blockedIps: string[];
}