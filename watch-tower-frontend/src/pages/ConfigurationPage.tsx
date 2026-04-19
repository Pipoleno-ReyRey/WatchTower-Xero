import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import type { IUserConfig } from "../schemas/user";
import { useState } from "react";
import { Eye, Save } from "lucide-react";

export const ConfigurationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<IUserConfig>();
  return (
    <div className="w-full space-y-3">
      <div className="py-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Configuración</h2>
      </div>
      <div className="">
        <form className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="">Informacion personal</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
              <Controller
                control={form.control}
                name="name"
                render={() => (
                  <Field>
                    <FieldLabel>Nombre</FieldLabel>
                    <Input />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="email"
                render={() => (
                  <Field>
                    <FieldLabel>Correo electronico</FieldLabel>
                    <Input type="email" />
                  </Field>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="">Cambiar credenciales</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
              <Controller
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <Field className="col-span-1 lg:col-span-2">
                    <FieldLabel>Contraseña actual</FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Nueva contraseña</FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="pin"
                render={() => (
                  <Field>
                    <FieldLabel>Nuevo pin</FieldLabel>
                    <Input />
                  </Field>
                )}
              />
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isValid}>
              <Save className="" />
              Guardar cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
