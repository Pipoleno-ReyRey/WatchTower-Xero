import {
  Filter,
  LockKeyhole,
  SearchIcon,
  Shield,
  TriangleAlert,
  User2,
  Plus,
} from "lucide-react";

import { Stat } from "../components/dashboard/Stat";
import { Card, CardContent } from "../components/ui/card";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";

import { UserTable } from "../components/user/UserTable";
import { UserModal } from "../components/user/UserModal";
import { CustomSelect } from "../components/form/CustomSelect";

import { Button } from "../components/ui/button";
import { useStore } from "../store/appStore";
import { useUser } from "../hooks/useUser";
import { useSearch } from "../hooks/useSearch";
import { roleOptions, statusOptions } from "../data/data";

export const UserPage = () => {
  const openCreate = useStore((s) => s.openCreate);

  const { userQuery } = useUser();
  const { filteredData, search, setSearch, setFilter } = useSearch(
    userQuery.data,
  );

  const totalUsers = filteredData.length;
  const usersEnabled = filteredData.filter((u) => u.status === true).length;
  const usersDisabled = filteredData.filter((u) => !u.status).length;

  return (
    <>
      <div className="w-full space-y-3">
        <div className="py-4 flex justify-between items-center">
          <h2 className="font-bold text-2xl">Gestión de usuarios</h2>

          <Button onClick={openCreate}>
            <Plus />
            Nuevo usuario
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Total usuarios"
            icon={User2}
            data={totalUsers.toString()}
          />
          <Stat label="Activo" icon={Shield} data={usersEnabled.toString()} />
          <Stat
            label="Bloqueado"
            icon={LockKeyhole}
            data={usersDisabled.toString()}
          />
          <Stat label="Alto riesgo" icon={TriangleAlert} data="2" />
        </div>

        <Card>
          <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <InputGroup>
                <InputGroupInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar usuarios por nombre o email..."
                />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex gap-2 items-center lg:col-span-1">
              <Filter size={30} className="hidden lg:block" />

              <CustomSelect
                placeholder="Roles"
                options={roleOptions}
                className="lg:w-44"
                onValueChange={(value) => setFilter("role", value)}
              />

              <CustomSelect
                placeholder="Estado"
                onValueChange={(value) => setFilter("status", value)}
                options={statusOptions}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <UserTable users={filteredData} />
          </CardContent>
        </Card>
      </div>

      <UserModal />
    </>
  );
};
