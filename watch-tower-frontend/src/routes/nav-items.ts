import {
  ClipboardList,
  Cog,
  FileText,
  LayoutDashboard,
  Shield,
  Users,
} from "lucide-react";

export const navItems = [
  {
    path: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["admin"], 
  },
  {
    path: "documents",
    label: "Documentos",
    icon: FileText,
    roles: ["admin", "auditor", "user"],
  },
  {
    path: "user",
    label: "Usuarios",
    icon: Users,
    roles: ["admin", "auditor"],
  },
  {
    path: "roles",
    label: "Roles",
    icon: Shield,
    roles: ["admin"],
  },
  {
    path: "audit",
    label: "Auditoría",
    icon: ClipboardList,
    roles: ["admin", "auditor"],
  },
  {
    path: "configuration",
    label: "Configuración",
    icon: Cog,
    roles: ["admin", "auditor", "user"],
  },
];
