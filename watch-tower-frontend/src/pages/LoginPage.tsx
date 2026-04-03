import { Eye, Lock, Shield, User, KeyRound } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import Swal from "sweetalert2";
import { loginSchema, type ILogin } from "../schemas/auth";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
// import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, isLoading } = useAuth();
  const form = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: "",
      password: "",
      pin: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: ILogin) {
    handleLogin(data);
  }

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-slate-900">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-wider text-white">
          WATCHTOWER XERO
        </h1>
        <p className="mt-1 font-mono text-xs tracking-widest text-muted-foreground">
          ZERO TRUST IDENTITY PLATFORM
        </p>
      </div>

      <Card className="w-full max-w-md border-0  font-medium">
        <CardContent className="pt-6">
          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FieldGroup>
              <Controller
                name="user"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-email">
                      Nombre de usuario
                    </FieldLabel>

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="login-email"
                        type="text"
                        // type="email"
                        placeholder="egerman"
                        className="pl-10 "
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-password">Contraseña</FieldLabel>

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

              <Controller
                name="pin"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-pin">
                      PIN de seguridad
                    </FieldLabel>

                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="login-pin"
                        type="text"
                        maxLength={6}
                        inputMode="numeric"
                        placeholder="123456"
                        className="pl-10"
                        aria-invalid={fieldState.invalid}
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid || isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
