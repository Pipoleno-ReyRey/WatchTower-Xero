import { Link } from "react-router-dom";
import { useState } from "react";
import type { IDocument } from "../../schemas/document";

import { Button } from "../ui/button";
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

interface Props {
  documents: IDocument[];
}

export const DocumentTable = ({ documents }: Props) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(documents.length / pageSize);

  const paginatedData = documents.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full space-y-4">
      {/* TABLE */}
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Titulo</TableHead>
              <TableHead>Propietario</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead>Actualizado</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((d) => (
              <TableRow key={d.id}>
                <TableCell>
                  <div className="font-medium">{d.title}</div>
                </TableCell>

                <TableCell>{d.owner}</TableCell>

                <TableCell>
                  {new Date(d.createdAt).toLocaleDateString("es-DO")}
                </TableCell>

                <TableCell>
                  {new Date(d.updatedAt).toLocaleDateString("es-DO")}
                </TableCell>

                <TableCell>
                  <Link to={`${d.id}`}>
                    <Button size="sm">Ver</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
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
