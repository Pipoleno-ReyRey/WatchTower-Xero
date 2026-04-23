import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { userConfigSchema, type IUserConfig } from "../schemas/user";
import { useState } from "react";
import { Eye, Save } from "lucide-react";
import { getCurrentUser } from "../lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserConfig } from "../hooks/useUserConfig";

export const ConfigurationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userConfigMutation } = useUserConfig();
  const currentuser = getCurrentUser();

  const form = useForm<IUserConfig>({
    resolver: zodResolver(userConfigSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      pin: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (data: IUserConfig) => {
    await userConfigMutation.mutateAsync(data);
    console.log(data);
  };

  return (
    <div className="w-full space-y-3">
      <div className="py-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Configuración</h2>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Información personal</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
            <Field>
              <FieldLabel>Nombre</FieldLabel>
              <Input disabled value={currentuser?.userName ?? ""} />
            </Field>

            <Field>
              <FieldLabel>Correo electrónico</FieldLabel>
              <Input disabled type="email" value={currentuser?.email ?? ""} />
            </Field>
          </CardContent>
        </Card>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Cambiar credenciales</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
              <Controller
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <Field className="col-span-1 lg:col-span-2">
                    <FieldLabel>Contraseña actual</FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="newPassword"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Nueva contraseña</FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
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

              <Controller
                control={form.control}
                name="pin"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Nuevo pin</FieldLabel>

                    <Input {...field} value={field.value ?? ""} />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={!form.formState.isValid}>
              <Save className="mr-2 h-4 w-4" />
              Guardar cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
