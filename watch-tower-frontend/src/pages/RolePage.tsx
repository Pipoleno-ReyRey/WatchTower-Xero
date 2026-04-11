import { RoleCard } from "../components/roles/RoleCard";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { useRoles } from "../hooks/useRoles";
import { RoleForm } from "../components/roles/RoleForm";

import { useStore } from "../store/appStore";

export const RolePage = () => {
  const { roleQuery } = useRoles();

  const role = useStore((state) => state.role);
  const setOpenModalRole = useStore((state) => state.setOpenModalRole);
  const setRole = useStore((state) => state.setRole);
  const openModalRole = useStore((state) => state.openModalRole);

  return (
    <div className="w-full space-y-3">
      <div className="py-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Gestión de roles</h2>
        <Button
          onClick={() => {
            setRole(null);
            setOpenModalRole(true);
          }}
        >
          <Plus />
          Nuevo rol
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {roleQuery.data?.map((r) => (
          <RoleCard key={r.id} role={r} />
        ))}
      </div>

      {openModalRole && (
        <RoleForm
          data={role}
          isOpen={openModalRole}
          onOpenChange={setOpenModalRole}
        />
      )}
    </div>
  );
};
