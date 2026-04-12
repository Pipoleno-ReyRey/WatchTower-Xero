import {
  LockKeyhole,
  LockKeyholeOpen,
  PencilLineIcon,
  Trash2Icon,
  UserRoundCog,
} from "lucide-react";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import Swal from "sweetalert2";
import { getCurrentUser } from "../../lib/axios";

interface Props {
  users: IUser[];
}

export const UserTable = ({ users }: Props) => {
  const navigate = useNavigate();
  const { blockUserMutation, deleteUserMutation } = useUser();
  const currentUser = getCurrentUser();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedData = users.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full space-y-4">
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Riesgo</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData
              .filter((user) => user.userName !== currentUser?.userName)
              .map((item) => (
                <TableRow key={item.userName}>
                  <TableCell className="font-medium">{item.userName}</TableCell>

                  <TableCell>{item.email}</TableCell>

                  <TableCell>{item.role[0].role ?? "Sin rol"}</TableCell>

                  <TableCell>{item.status ? "Activo" : "Bloqueado"}</TableCell>

                  <TableCell>{item.risk}</TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size={"sm"}>
                          <UserRoundCog size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-34">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => navigate(`${item.id}`)}
                          >
                            <PencilLineIcon />
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => blockUserMutation.mutate(item.id)}
                          >
                            {item.status ? (
                              <LockKeyhole />
                            ) : (
                              <LockKeyholeOpen />
                            )}
                            {item.status ? "Bloquear" : "Desbloquear"}
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                              Swal.fire({
                                title: "¿Estás seguro?",
                                text: "¡No podrás revertir esto!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#d33",
                                cancelButtonColor: "#3085d6",
                                confirmButtonText: "Sí, eliminar",
                                cancelButtonText: "Cancelar",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteUserMutation.mutate(item.id);
                                  navigate(`..`);
                                }
                              });
                            }}
                          >
                            <Trash2Icon />
                            <span>Borrar</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
