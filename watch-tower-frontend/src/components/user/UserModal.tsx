/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
import { Eye, Lock } from "lucide-react";
import { useRoles } from "../../hooks/useRoles";

// const statusOptions = [
//   { label: "Activo", value: "1" },
//   { label: "Inactivo", value: "2" },
//   { label: "Bloqueado", value: "3" },
// ];

export const UserModal = () => {
  const { isOpenModal, closeModal, selectedUser } = useStore();
  const [showPassword, setShowPassword] = useState(false);

  const { data } = useRoles();

  const form = useForm<UserForm>({
    resolver: zodResolver(userCreateSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      roles: undefined,
      // status: true,
      pin: "",
      password: "",
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
    console.log(data);
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
              name="userName"
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
            {/* password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Contraseña<span className="text-red-500">*</span>
                  </FieldLabel>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      {...field}
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      className="pl-10 pr-10"
                      aria-invalid={fieldState.invalid}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* rol */}

            <Controller
              name="roles"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Rol<span className="text-red-500">*</span>
                  </FieldLabel>

                  <CustomSelect
                    placeholder="Seleccionar rol"
                    options={(data ?? []).map((r) => ({
                      label: r.role,
                      value: r.id.toString(),
                    }))}
                    defaultValue={field.value?.[0]?.id?.toString()}
                    onValueChange={(value) => {
                      const selectedRole = data?.find(
                        (r) => r.id.toString() === value,
                      );

                      if (selectedRole) {
                        field.onChange([selectedRole]); 
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

            {/* <Controller
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
                    defaultValue={field.value ? "true" : "false"}
                    onValueChange={(value) => field.onChange(value === "true")}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}

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
