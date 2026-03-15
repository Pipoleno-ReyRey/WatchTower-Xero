import { Plus } from "lucide-react";
import { useRoles } from "../../hooks/useRoles";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// import {
//   createRoleSchema,
//   updateRoleSchema,
//   type CreateRole,
//   type Role,
//   type UpdateRole,
// } from "../../schemas/role";
// import { zodResolver } from "@hookform/resolvers/zod";
import { NativeSelect } from "../ui/native-select";

// interface Prop  {
//     userData:

// }
export const DocumentModal = () => {
  const { data: roles } = useRoles();
  //   const form = useForm<CreateRole | UpdateRole>({
  //     resolver: zodResolver(createRoleSchema || updateRoleSchema),
  //     defaultValues: {
  //       role: "",
  //     },
  //     mode: "onChange",
  //   });

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Plus />
            Nuevo Documento
          </Button>
        </DialogTrigger>
        <DialogContent  className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <NativeSelect defaultValue="">
                <option value="" disabled>
                  Seleccione un rol
                </option>

                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </NativeSelect>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
