import { RoleCard } from "../components/roles/RoleCard";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { useRoles } from "../hooks/useRoles";

export const RolePage = () => {
  const { data } = useRoles();
  return (
    <div className="w-full space-y-3">
      <div className="py-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Gestión de roles</h2>
        <Button>
          {/* <Button onClick={openCreate}> */}
          <Plus />
          Nuevo rol
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data?.map((r) => (
          <RoleCard key={r.id} role={r} />
        ))}
        {/* <RoleCard />
        <RoleCard />
        <RoleCard />
        <RoleCard /> */}
      </div>
    </div>
  );
};
