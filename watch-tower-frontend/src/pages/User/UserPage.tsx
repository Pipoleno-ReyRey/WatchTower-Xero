import {
  Filter,
  LockKeyhole,
  SearchIcon,
  Shield,
  TriangleAlert,
  User2,
  Plus,
} from "lucide-react";

import { Stat } from "../../components/dashboard/Stat";
import { Card, CardContent } from "../../components/ui/card";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";

import { UserTable } from "../../components/user/UserTable";

import { CustomSelect } from "../../components/form/CustomSelect";

import { Button } from "../../components/ui/button";

import { useUser } from "../../hooks/useUser";
import { useSearch } from "../../hooks/useSearch";
import { statusOptions } from "../../data/data";
import { Link } from "react-router-dom";
import { useRoles } from "../../hooks/useRoles";

export const UserPage = () => {
  const { userQuery } = useUser();
  const { data: roles } = useRoles();
  const { filteredData, search, setSearch, setFilter } = useSearch(
    userQuery.data,
  );

  const totalUsers = filteredData?.length ?? 0;

  const usersEnabled =
    filteredData?.filter((u) => u.status === true).length ?? 0;

  const usersDisabled =
    filteredData?.filter((u) => u.status === false).length ?? 0;

  return (
    <>
      <div className="w-full space-y-3">
        <div className="py-4 flex justify-between items-center">
          <h2 className="font-bold text-2xl">Gestión de usuarios</h2>

          <Link to={"./create"}>
            <Button>
              <Plus />
              Nuevo usuario
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total usuarios" icon={User2} data={totalUsers} />
          <Stat label="Activo" icon={Shield} data={usersEnabled} />
          <Stat label="Bloqueado" icon={LockKeyhole} data={usersDisabled} />
          <Stat label="Alto riesgo" icon={TriangleAlert} data={"0"} />
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

              {/* <CustomSelect
                placeholder="Roles"
                options={roles ?? []}
                className="lg:w-44"
                onValueChange={(value) => setFilter("role", value)}
              /> */}
              <CustomSelect
                placeholder="Roles"
                options={(roles ?? []).map((r) => ({
                  label: r.role,
                  value: r.id.toString(),
                }))}
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
            <UserTable users={filteredData || []} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
