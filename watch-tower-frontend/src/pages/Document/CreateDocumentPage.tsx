import { ArrowLeft, Save, Lock } from "lucide-react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createDocumentSchema,
  type CreateDocumentForm,
} from "../../schemas/document";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";

export const CreateDocumentPage = () => {
  const form = useForm<CreateDocumentForm>({
    resolver: zodResolver(createDocumentSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      content: "",
      hasKey: false,
      docKey: "",
    },
  });

  const hasKey = useWatch({
    control: form.control,
    name: "hasKey",
  });

  function onSubmit(data: CreateDocumentForm) {
    console.log("Documento creado", data);
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to={".."}>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Volver a documentos
        </button>
      </Link>

      <h1 className="text-xl font-semibold">Crear documento</h1>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:p-6"
      >
        <FieldGroup>
          {/* Nombre */}

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nombre del documento</FieldLabel>

                <Input {...field} placeholder="Ej. Informe Trimestral Q1" />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Contenido */}

          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Contenido</FieldLabel>

                <textarea
                  {...field}
                  rows={8}
                  placeholder="Escriba el contenido del documento..."
                  className="rounded-md border px-3 py-2 text-sm"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Switch protección */}

          <Controller
            name="hasKey"
            control={form.control}
            render={({ field }) => (
              <div className="flex items-center gap-3 rounded-lg border bg-secondary/50 p-3">
                <Lock className="h-4 w-4 text-muted-foreground" />

                <div className="flex-1">
                  <p className="text-sm font-medium">Proteger con clave</p>
                  <p className="text-xs text-muted-foreground">
                    Los usuarios necesitarán la clave para ver el contenido
                  </p>
                </div>

                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />

          {/* Clave */}

          {hasKey && (
            <Controller
              name="docKey"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Clave de acceso</FieldLabel>

                  <Input
                    {...field}
                    type="password"
                    placeholder="Defina una clave"
                    className="font-mono"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}
        </FieldGroup>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" type="button">
            Cancelar
          </Button>

          <Button type="submit" disabled={!form.formState.isValid}>
            <Save className="mr-2 h-4 w-4" />
            Guardar documento
          </Button>
        </div>
      </form>
    </div>
  );
};
