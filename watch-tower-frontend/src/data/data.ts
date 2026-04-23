import type { IDocument } from "../schemas/document";

export const roleOptions = [
  { label: "Administrador", value: "1" },
  { label: "Usuario", value: "2" },
];

export const statusOptions = [
  { label: "Activo", value: "true" },
  // { label: "Inactivo", value: "2" },
  { label: "Bloqueado", value: "false" },
];

export const dataUsers = [
  {
    id: 1,
    name: "Pedro Duarte",
    username: "pduarte",
    email: "pedro.duarte@email.com",
    role: {
      id: 1,
      role: "Administrador",
      description: "Acceso total",
    },
    status: "1",
    pin: "123456",
  },
  {
    id: 2,
    name: "Juan Pérez",
    username: "jperez",
    email: "juan.perez@email.com",
    role: {
      id: 2,
      role: "Usuario",
      description: "Acceso básico",
    },
    status: "1",
    pin: "654321",
  },
  {
    id: 3,
    name: "María Rodríguez",
    username: "mrodriguez",
    email: "maria.rodriguez@email.com",
    role: {
      id: 2,
      role: "Usuario",
      description: "Acceso básico",
    },
    status: "2",
    pin: "112233",
  },
  {
    id: 4,
    name: "Carlos Gómez",
    username: "cgomez",
    email: "carlos.gomez@email.com",
    role: {
      id: 1,
      role: "Administrador",
      description: "Acceso total",
    },
    status: "3",
    pin: "445566",
  },
];

export const mockDocuments: IDocument[] = [
  {
    id: "1",
    name: "Informe Financiero Q4",
    type: "PDF",
    owner: "Carlos Mendoza",
    createdAt: "2026-01-15",
    updatedAt: "2026-02-20",
    size: "2.4 MB",
    hasKey: true,

    content:
      "Este informe contiene los resultados financieros del cuarto trimestre del ejercicio fiscal 2025. Se incluyen estados de resultados, balance general y flujo de efectivo.",
  },
  {
    id: "2",
    name: "Contrato Proveedor Alpha",
    type: "DOCX",
    owner: "Ana Torres",
    createdAt: "2026-02-01",
    updatedAt: "2026-02-18",
    size: "890 KB",
    hasKey: false,

    content:
      "Contrato de servicios profesionales celebrado entre Watchtower Xero y Proveedor Alpha para el suministro de infraestructura cloud.",
  },
  {
    id: "3",
    name: "Manual de Seguridad v3",
    type: "PDF",
    owner: "Carlos Mendoza",
    createdAt: "2025-11-10",
    updatedAt: "2026-02-15",
    size: "5.1 MB",
    hasKey: true,

    content:
      "Manual de politicas y procedimientos de seguridad de la informacion. Version 3.0 - Incluye protocolos de respuesta a incidentes y gestion de vulnerabilidades.",
  },
  {
    id: "4",
    name: "Plano Arquitectura Red",
    type: "PNG",
    owner: "Luis Ramirez",
    createdAt: "2026-01-22",
    updatedAt: "2026-02-10",
    size: "3.7 MB",
    hasKey: true,

    content:
      "Diagrama de la arquitectura de red corporativa incluyendo segmentos de DMZ, red interna y conexiones VPN.",
  },
  {
    id: "5",
    name: "Politica de Accesos 2026",
    type: "PDF",
    owner: "Maria Garcia",
    createdAt: "2026-02-05",
    updatedAt: "2026-02-22",
    size: "1.2 MB",
    hasKey: false,
    content:
      "Politica actualizada de gestion de accesos y privilegios. Define los criterios para asignacion, revision y revocacion de permisos.",
  },
  {
    id: "6",
    name: "Reporte de Vulnerabilidades",
    type: "XLSX",
    owner: "Carlos Mendoza",
    createdAt: "2026-02-10",
    updatedAt: "2026-02-21",
    size: "456 KB",
    hasKey: true,

    content:
      "Reporte consolidado de vulnerabilidades detectadas durante el escaneo trimestral de seguridad perimetral.",
  },
];
