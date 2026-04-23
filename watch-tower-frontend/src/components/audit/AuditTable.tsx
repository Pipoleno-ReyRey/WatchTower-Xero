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

  return (
    <div className="w-full space-y-4">
      {/* TABLE */}
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Fecha</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Accion</TableHead>
              <TableHead>IP</TableHead>
              {/* <TableHead>Estado</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((a) => (
              <TableRow key={a.date}>
                <TableCell>
                  <div className="font-medium">
                    {new Date(a.date).toLocaleDateString("es-DO")}
                  </div>
                </TableCell>

                <TableCell>{a.userName}</TableCell>

                <TableCell>{a.description}</TableCell>

                <TableCell>{a.ip}</TableCell>
                {/* 
                <TableCell>
                  <Link to={`${d.id}`}>
                    <Button size="sm">Ver</Button>
                  </Link>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="z-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              size={"lg"}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={page === pageNumber}
                  onClick={() => setPage(pageNumber)}
                  size={"lg"}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* NEXT */}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
              size={"lg"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
