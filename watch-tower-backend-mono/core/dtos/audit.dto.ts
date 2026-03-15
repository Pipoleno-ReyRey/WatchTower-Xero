export class AuditLogDto {
  userName!: string; 
  action!: string;
  ip!: string;
  date?: Date;
}
