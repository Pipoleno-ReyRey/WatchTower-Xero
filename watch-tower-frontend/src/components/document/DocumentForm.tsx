import { ArrowLeft, Save, Lock } from "lucide-react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createDocumentSchema,
  updateDocumentSchema,
  type CreateDocumentForm,
  type UpdateDocumentForm,
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
import { useEffect } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useStore } from "../../store/appStore";

interface Props {
  document?: UpdateDocumentForm | null;
}

export const DocumentForm = ({ document }: Props) => {
  const { documentMutation, updateDocumentMutation } = useDocument();

  const unlockedContent = useStore(
    (state) => state.unlockedDocuments[document?.id ?? 0],
  );

  const isEdit = !!document?.id;

  const form = useForm<CreateDocumentForm | UpdateDocumentForm>({
    resolver: zodResolver(isEdit ? updateDocumentSchema : createDocumentSchema),
    mode: "onChange",
    defaultValues: {
      id: document?.id,
      title: document?.title ?? "",
      content: document?.content ?? "",
      hasPass: document?.hasPass ?? false,
      owner: document?.owner ?? "currentUser",
    },
  });

  const values = form.getValues();

  const canSubmit = values.title?.length > 0 && values.content?.length > 0;

  const hasKey = useWatch({
    control: form.control,
    name: "hasPass",
  });

  // limpiar pass si se desactiva
  useEffect(() => {
    if (!hasKey) {
      form.setValue("pass", "");
    }
  }, [hasKey, form]);

  useEffect(() => {
    if (unlockedContent) {
      form.setValue("content", unlockedContent, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [form, unlockedContent]);

  function onSubmit(data: CreateDocumentForm | UpdateDocumentForm) {
    const payload = {
      ...data,
      id: "id" in data ? data.id : undefined,
      owner: document?.owner ?? "currentUser",
      title: data.title ?? "",
      content: data.content ?? "",
      hasPass: data.hasPass ?? false,
      pass: data.hasPass && "pass" in data && data.pass ? data.pass : undefined,
    };

    if ("id" in data) {
      console.log("Updating document:", payload);
      updateDocumentMutation.mutate(payload);
      return;
    }

    documentMutation.mutate(payload);
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to={".."}>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Volver a documentos
        </button>
      </Link>

      <h1 className="text-xl font-semibold">
        {document ? "Editar documento" : "Crear documento"}
      </h1>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:p-6"
      >
        {/* {JSON.stringify(form.formState.errors)} */}

        <FieldGroup>
          {/* Nombre */}
          <Controller
            name="title"
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

          {/* Switch protección (solo crear) */}
          {!document?.id && (
            <Controller
              name="hasPass"
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
          )}

          {/* Clave */}
          {hasKey && !document && (
            <Controller
              name="pass"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Clave de acceso</FieldLabel>

                  <Input
                    {...field}
                    value={field.value ?? ""}
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

          <Button type="submit" disabled={!canSubmit}>
            <Save className="mr-2 h-4 w-4" />
            {document ? "Guardar cambios" : "Crear documento"}
          </Button>
        </div>
      </form>
    </div>
  );
};
