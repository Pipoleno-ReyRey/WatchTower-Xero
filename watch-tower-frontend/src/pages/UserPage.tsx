import {
  Filter,
  LockKeyhole,
  Plus,
  SearchIcon,
  Shield,
  TriangleAlert,
  User2,
} from "lucide-react";
import { Stat } from "../components/dashboard/Stat";
import { Card, CardContent } from "../components/ui/card";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";

import { NativeSelect } from "../components/ui/native-select";
import { useId } from "react";
import { UserTable } from "../components/user/UserTable";
import { Button } from "../components/ui/button";
import UserModal from "../components/user/UserModal";

export const UserPage = () => {
  const id = useId();
  return (
    <div className="w-full space-y-3">
      <div className="py-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Gestión de usuarios</h2>
        <Button className="cursor-pointer">
          <Plus />
          Nuevo ususario
        </Button>
        <UserModal />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total usuarios" icon={User2} data="10" />
        <Stat label="Activo" icon={Shield} data="7" />
        <Stat label="Bloqueado" icon={LockKeyhole} data="2" />
        <Stat label="Alto riego" icon={TriangleAlert} data="2" />
      </div>
      <Card>
        <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <InputGroup>
              <InputGroupInput placeholder="Buscar usuarios por nombre o email..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="flex gap-2 items-center lg:col-span-1">
            <Filter size={20} className="hidden lg:block" />

            <NativeSelect id={id} defaultValue="" className=" lg:w-44">
              <option value="" disabled>
                Roles
              </option>
              <option value="1">Administrador</option>
              <option value="2">Usuario</option>
            </NativeSelect>

            <NativeSelect id={id} defaultValue="" className=" ">
              <option value="" disabled>
                Estado
              </option>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
              <option value="3">Bloqueado</option>
            </NativeSelect>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <UserTable />
        </CardContent>
      </Card>
    </div>
  );
};
