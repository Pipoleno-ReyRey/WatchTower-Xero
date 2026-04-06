import { RoleCard } from "../components/roles/RoleCard";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { useRoles } from "../hooks/useRoles";
import { RoleForm } from "../components/roles/RoleForm";
import { useState } from "react";

export const RolePage = () => {
  const { data } = useRoles();
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full space-y-3">
      <div className="py-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Gestión de roles</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus />
          Nuevo rol
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data?.map((r) => (
          <RoleCard key={r.id} role={r} />
        ))}
      </div>

      {open && <RoleForm isOpen={open} onOpenChange={setOpen} />}
    </div>
  );
};
