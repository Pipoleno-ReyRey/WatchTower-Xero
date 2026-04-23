import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

import type { IAudit } from "../../schemas/audit";

interface Props {
  data: IAudit[];
}

export const AuditTable = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(data.length / pageSize);

  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // 🔥 PAGINACIÓN INTELIGENTE
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) pages.push("...");

    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="w-full space-y-4">
      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <div className="[&>div]:rounded-sm [&>div]:border">
          <Table className="min-w-full table-fixed">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-35">Fecha</TableHead>
                <TableHead className="w-40">Usuario</TableHead>
                <TableHead className="w-75">Accion</TableHead>
                <TableHead className="w-35">IP</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((a) => (
                <TableRow key={a.date}>
                  <TableCell className="whitespace-nowrap">
                    {new Date(a.date).toLocaleDateString("es-DO")}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {a.userName}
                  </TableCell>

                  <TableCell className="max-w-75 truncate">
                    {a.description}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">{a.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PAGINATION */}
      <Pagination className="overflow-x-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
              size={undefined}
            />
          </PaginationItem>

          {getPages().map((p, i) => (
            <PaginationItem key={i}>
              {p === "..." ? (
                <span className="px-2">...</span>
              ) : (
                <PaginationLink
                  isActive={page === p}
                  onClick={() => setPage(Number(p))}
                  size={undefined}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
              size={undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
