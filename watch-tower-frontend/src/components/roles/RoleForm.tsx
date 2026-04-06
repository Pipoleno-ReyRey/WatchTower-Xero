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
import { Field, FieldGroup } from "../ui/field";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { Role } from "../../schemas/role";
import { Textarea } from "../ui/textarea";

interface Props {
  data?: Role;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RoleForm = ({ data, isOpen, onOpenChange }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{data ? "Editar rol" : "Nuevo rol"}</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="role">Titulo</Label>
              <Input id="role" name="role" />
            </Field>
            <Field>
              <Label htmlFor="description">Descripcion</Label>
              <Textarea id="description" name="description" />
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
