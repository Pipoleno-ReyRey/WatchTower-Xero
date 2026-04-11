import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Field } from "../ui/field";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  createRoleSchema,
  updateRoleSchema,
  type CreateRole,
  type Role,
  type UpdateRole,
} from "../../schemas/role";
import { Textarea } from "../ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../../store/appStore";
import { useRoles } from "../../hooks/useRoles";

interface Props {
  data?: Role | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RoleForm = ({ data, isOpen }: Props) => {
  const { roleMutation } = useRoles();
  const setOpenModalRole = useStore((state) => state.setOpenModalRole);
  const setRole = useStore((state) => state.setRole);

  const form = useForm<UpdateRole | UpdateRole>({
    resolver: zodResolver(data ? updateRoleSchema : createRoleSchema),
    defaultValues: {
      id: data?.id,
      role: data?.role || "",
      description: data?.description || "",
    },
    mode: "onChange",
  });

  function onSubmit(formData: UpdateRole | CreateRole) {
    if (data?.id) {
      const payload = data?.id ? { ...formData, id: data.id } : formData;
      console.log(payload);
      return;
    }

    roleMutation.mutate(formData as CreateRole);
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setOpenModalRole(false);
        setRole(null);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle>{data ? "Editar rol" : "Nuevo rol"}</DialogTitle>
            <DialogDescription>
              {data
                ? "Modifica la información del rol"
                : "Completa los datos para crear un nuevo rol"}
            </DialogDescription>
          </DialogHeader>

          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <Label htmlFor="role">Nombre</Label>
                <Input id="role" {...field} value={field.value || ""} />
                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <Label htmlFor="description">Descripcion</Label>
                <Textarea
                  id="description"
                  {...field}
                  value={field.value || ""}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setOpenModalRole(false);
                  // setRole(null);
                }}
                type="button"
                variant="outline"
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
