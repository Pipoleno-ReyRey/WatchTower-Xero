import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { ArrowLeft, Save, Lock, Eye } from "lucide-react";

import { userCreateSchema, type IUserForm } from "../../schemas/user";
// import { useStore } from "../../store/appStore";
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
  user?: IUserForm;
}
export const UserForm = ({ user }: Props) => {
  const { data: roles } = useRoles();
  const { createUserMutation } = useUser();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<IUserForm>({
    resolver: zodResolver(userCreateSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      password: "",
      roles: [],
      pin: "",
    },
  });

  async function onSubmit(data: IUserForm) {
    try {
      await createUserMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const isLoading = createUserMutation.isPending;

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
        {"Crear usuario"}
        {/* {  "Editar usuario" : "Crear usuario"} */}
      </h1>

      {/* card */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:p-6"
      >
        <FieldGroup>
          {/* nombre */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nombre</FieldLabel>

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
                <FieldLabel>Nombre de usuario</FieldLabel>

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
                <FieldLabel>Email</FieldLabel>

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
                <FieldLabel>Contraseña {"*"}</FieldLabel>

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

          {/* rol */}
          <Controller
            name="roles"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Rol</FieldLabel>

                <CustomSelect
                  options={(roles ?? []).map((r) => ({
                    label: r.role,
                    value: r.id.toString(),
                  }))}
                  value={field.value?.[0]?.id?.toString() ?? ""}
                  onValueChange={(value) => {
                    const selected = roles?.find(
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

        {/* footer */}
        <div className="flex justify-end gap-2 pt-2">
          <Link to={".."}>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </Link>

          <Button type="submit" disabled={!form.formState.isValid || isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {/* {isLoading ? "Guardando..." : selectedUser ? "Actualizar" : "Crear"} */}
            {"Crear"}
          </Button>
        </div>
      </form>
    </div>
  );
};
