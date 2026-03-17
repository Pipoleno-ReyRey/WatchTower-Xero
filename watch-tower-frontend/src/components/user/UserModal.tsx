/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userCreateSchema, type UserForm } from "../../schemas/user";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { CustomSelect } from "../form/CustomSelect";

import { useStore } from "../../store/appStore";

const statusOptions = [
  { label: "Activo", value: "1" },
  { label: "Inactivo", value: "2" },
  { label: "Bloqueado", value: "3" },
];

const roleOptions = [
  {
    label: "Administrador",
    value: "1",
    role: {
      id: 1,
      role: "Administrador",
      description: "Acceso total",
    },
  },
  {
    label: "Usuario",
    value: "2",
    role: {
      id: 2,
      role: "Usuario",
      description: "Acceso básico",
    },
  },
];

export const UserModal = () => {
  const { isOpenModal, closeModal, selectedUser } = useStore();

  const form = useForm<UserForm>({
    resolver: zodResolver(userCreateSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      role: undefined as any,
      status: "",
      pin: "",
    },
  });

  // llenar formulario cuando se edita
  useEffect(() => {
    if (selectedUser?.id) {
      form.reset(selectedUser);
    } else {
      form.reset();
    }
  }, [selectedUser, form]);

  function onSubmit(data: UserForm) {
    if (selectedUser?.id) {
      console.log("Actualizar usuario", data);
    } else {
      console.log("Crear usuario", data);
    }

    closeModal();
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={closeModal}>
      <DialogContent className="max-w-md lg:max-w-xl  transition-none animate-none">
        <DialogHeader>
          <DialogTitle>
            {selectedUser?.id ? "Editar usuario" : "Nuevo usuario"}
          </DialogTitle>

          <DialogDescription>
            Complete la información del usuario
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            {/* nombre */}

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Nombre<span className="text-red-500">*</span>
                  </FieldLabel>

                  <Input {...field} placeholder="Pedro Duarte" />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* username */}

            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Nombre de usuario<span className="text-red-500">*</span>
                  </FieldLabel>

                  <Input {...field} placeholder="pduarte" />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* email */}

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Email<span className="text-red-500">*</span>
                  </FieldLabel>

                  <Input {...field} type="email" />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* rol */}

            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Rol<span className="text-red-500">*</span>
                  </FieldLabel>

                  <CustomSelect
                    placeholder="Seleccionar rol"
                    options={roleOptions.map((r) => ({
                      label: r.label,
                      value: r.value,
                    }))}
                    defaultValue={field.value?.id?.toString()}
                    onValueChange={(value) => {
                      const selectedRole = roleOptions.find(
                        (r) => r.value === value,
                      );

                      if (selectedRole) {
                        field.onChange(selectedRole.role);
                      }
                    }}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* estado */}

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Estado<span className="text-red-500">*</span>
                  </FieldLabel>

                  <CustomSelect
                    placeholder="Estado"
                    options={statusOptions}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* pin */}

            <Controller
              name="pin"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    PIN<span className="text-red-500">*</span>
                  </FieldLabel>

                  <Input
                    {...field}
                    maxLength={6}
                    inputMode="numeric"
                    placeholder="123456"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancelar
            </Button>

            <Button type="submit" disabled={!form.formState.isValid}>
              {selectedUser ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
