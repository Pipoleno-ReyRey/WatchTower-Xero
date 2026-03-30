import { Users, FileText, Shield, Activity, Ban, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { useDashboard } from "../hooks/useDashboard";
import { Stat } from "../components/dashboard/Stat";
import { formatDate } from "../utils/formatDate";

export const DashboardPage = () => {
  const { dashboardQuery } = useDashboard();
  return (
    <div className=" w-full">
      <div className="mx-auto max-w-7xl space-y-3">
        <div className="py-4 flex justify-between items-center">
          <h2 className="font-bold text-2xl">Dashboard de seguridad</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Stat
            icon={Users}
            data={dashboardQuery.data?.totalUsers ?? 0}
            label="Total Usuarios"
            subtitle="usuarios registrados"
          />
          <Stat
            icon={FileText}
            data={dashboardQuery.data?.totalDocuments ?? 0}
            label="Total Documentos"
            subtitle="documentos en el sistema"
          />
          <Stat
            icon={Shield}
            data={dashboardQuery.data?.totalRoles ?? 0}
            label="Total Roles"
            subtitle="roles configurados"
          />
          <Stat
            icon={Ban}
            data={dashboardQuery.data?.blockedIps.length ?? 0}
            label="IPs Bloqueadas"
            subtitle="direcciones bloqueadas"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5 text-primary" />
                Usuarios Activos
              </CardTitle>
              <CardDescription>
                Lista de todos los usuarios registrados en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-80 overflow-auto rounded-md border border-border">
                <Table>
                  <TableHeader className="sticky top-0 bg-secondary">
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Riesgo</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {dashboardQuery.data?.activeUsers.map((user, index) => (
                      <TableRow
                        key={index}
                        className="transition-colors hover:bg-secondary/50"
                      >
                        <TableCell className="font-medium">
                          {user.userName}
                        </TableCell>

                        <TableCell className="text-muted-foreground">
                          {user.email}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-primary/50 text-primary"
                          >
                            {user.risk}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-primary">Activo</span>
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="h-5 w-5 text-primary" />
                Roles del Sistema
              </CardTitle>
              <CardDescription>
                Distribución de usuarios por rol
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardQuery.data?.roles.map((role) => (
                  <div
                    key={role.role}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {role.role}
                    </span>
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground"
                    >
                      {role.users} usuarios
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Activity className="h-5 w-5 text-primary" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>Últimos eventos del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardQuery.data?.lastLogs.map((log) => (
                  <div
                    key={log.ip}
                    className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">
                        {log.user}
                      </span>
                      <Badge
                        variant={
                          log.action.includes("FAILED")
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {log.action.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(log.date)}
                      </span>
                      <span className="font-mono text-xs">IP: {log.ip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Ban className="h-5 w-5 text-destructive" />
                IPs Bloqueadas
              </CardTitle>
              <CardDescription>
                Direcciones IP con acceso denegado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {dashboardQuery.data?.blockedIps.map((ip) => (
                  <div
                    key={ip}
                    className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2"
                  >
                    <Ban className="h-4 w-4 text-destructive" />
                    <span className="font-mono text-sm text-foreground">
                      {ip}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
