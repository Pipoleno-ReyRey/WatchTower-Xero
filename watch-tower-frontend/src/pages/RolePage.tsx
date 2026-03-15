import { RoleCard } from "../components/roles/RoleCard";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

export const RolePage = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <RoleCard />
        <RoleCard />
        <RoleCard />
        <RoleCard />
      </div>
    </div>
  );
};
