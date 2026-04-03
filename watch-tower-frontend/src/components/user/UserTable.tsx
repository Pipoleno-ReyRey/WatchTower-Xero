import { UserRoundCog } from "lucide-react";
import { useState } from "react";
import type { IUser } from "../../schemas/user";

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

import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  users: IUser[];
}

export const UserTable = ({ users }: Props) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(users.length / pageSize);

  const paginatedData = users.slice((page - 1) * pageSize, page * pageSize);
  console.log(users[0]);

  return (
    <div className="w-full space-y-4">
      {/* TABLE */}
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.userName}>
                <TableCell className="font-medium">{item.userName}</TableCell>

                <TableCell>{item.email}</TableCell>

                <TableCell>{item.roles?.role ?? "Sin rol"}</TableCell>

                <TableCell>{item.status ? "Activo" : "Bloqueado"}</TableCell>

                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`${item.id}`)}
                  >
                    <UserRoundCog size={18} />
                  </Button>
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
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
              size={"lg"}
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
