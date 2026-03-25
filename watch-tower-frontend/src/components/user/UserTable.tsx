import { UserRoundCog } from "lucide-react";
import type { IUser } from "../../schemas/user";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
// import { useStore } from "../../store/appStore";
import { useNavigate } from "react-router-dom";

interface Props {
  users: IUser[];
}

export const UserTable = ({ users }: Props) => {
  // const openEdit = useStore((s) => s.openEdit);
  const navigate = useNavigate();

  return (
    <div className="w-full">
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
            {users.map((item) => (
              <TableRow key={item.userName}>
                <TableCell className="font-medium">{item.userName}</TableCell>

                <TableCell>{item.email}</TableCell>

                <TableCell>{item.roles?.[0]?.role ?? "Sin rol"}</TableCell>

                <TableCell>
                  {item.status === true ? "Activo" : "Bloqueado"}
                </TableCell>

                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigate(`${item.id}`);
                    }}
                  >
                    <UserRoundCog size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
