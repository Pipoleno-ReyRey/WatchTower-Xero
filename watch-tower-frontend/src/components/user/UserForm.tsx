// este componente fue hecho por ia
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { ArrowLeft, Save, Lock, Eye } from "lucide-react";

import {
  userCreateSchema,
  userUpdateSchema,
  type IUserForm,
  type UpdateUserForm,
} from "../../schemas/user";

import { useRoles } from "../../hooks/useRoles";
import { useUser } from "../../hooks/useUser";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { CustomSelect } from "../../components/form/CustomSelect";

interface Props {
  user: {
    id: number;
    name: string;
    userName: string;
    email: string;
    pin: string;
    role: { id: number; role: string }[];
  } | null;
}

export const UserForm = ({ user }: Props) => {
  const { roleQuery } = useRoles();
  const { createUserMutation, updateUserMutation } = useUser();

  const [showPassword, setShowPassword] = useState(false);

  const isEdit = !!user;

  const form = useForm<IUserForm | UpdateUserForm>({
    resolver: zodResolver(isEdit ? userUpdateSchema : userCreateSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      password: "",
      role: [],
      pin: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        userName: user.userName,
        email: user.email,
        password: "",
        pin: user.pin || "",
        role: user.role,
      });
      form.trigger();
    }
  }, [user, form]);

  async function onSubmit(data: IUserForm | UpdateUserForm) {
    try {
      if (isEdit && user?.id) {
        await updateUserMutation.mutateAsync({
          id: user.id,
          name: data.name,
          userName: data.userName,
          email: data.email,
          pin: data.pin,

          role: data.role[0], // 🔥 AQUÍ ESTÁ TODO EL FIX
        });
      } else {
        await createUserMutation.mutateAsync(data as IUserForm);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const isLoading =
    createUserMutation.isPending || updateUserMutation.isPending;

  return (
    <div className="flex flex-col gap-4">
      {/* back */}
      <Link to={".."}>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Volver a usuarios
        </button>
      </Link>

      {/* title */}
      <h1 className="text-xl font-semibold">
        {isEdit ? "Editar usuario" : "Crear usuario"}
      </h1>

      {/* form */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:p-6"
      >
        {/* <p> {JSON.stringify(form.formState.errors)}</p> */}
        <FieldGroup>
          {/* nombre */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nombre</FieldLabel>
                <Input {...field} />
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
                <FieldLabel>Nombre de usuario</FieldLabel>
                <Input {...field} />
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
                <FieldLabel>Email</FieldLabel>
                <Input {...field} type="email" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* password SOLO EN CREATE */}
          {!isEdit && (
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Contraseña *</FieldLabel>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
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
          )}

          {/* rol */}
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Rol</FieldLabel>

                <CustomSelect
                  options={(roleQuery.data ?? []).map((r) => ({
                    label: r.role,
                    value: r.id.toString(),
                  }))}
                  value={field.value?.[0]?.id?.toString() ?? ""}
                  onValueChange={(value) => {
                    const selected = roleQuery.data?.find(
                      (r) => r.id.toString() === value,
                    );
                    if (selected) field.onChange([selected]);
                  }}
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
                <FieldLabel>PIN</FieldLabel>
                <Input {...field} maxLength={6} inputMode="numeric" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* footer */}
        <div className="flex justify-end gap-2 pt-2">
          <Link to={".."}>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>

          <Button type="submit" disabled={isLoading || !form.formState.isValid}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Guardando..." : isEdit ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </div>
  );
};
