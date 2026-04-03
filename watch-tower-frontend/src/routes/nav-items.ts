import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  Shield,
  Users,
} from "lucide-react";

export const navItems = [
  { path: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "documents", label: "Documentos", icon: FileText },
  { path: "user", label: "Usuarios", icon: Users },
  { path: "roles", label: "Roles", icon: Shield },
  { path: "audit", label: "Auditoría", icon: ClipboardList },
];
