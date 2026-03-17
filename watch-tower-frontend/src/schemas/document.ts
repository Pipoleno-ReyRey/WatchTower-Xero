import { z } from "zod";

export const createDocumentSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido"),
    content: z.string().min(1, "El contenido es requerido"),
    hasKey: z.boolean(),
    docKey: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.hasKey && !data.docKey) return false;
      return true;
    },
    {
      message: "La clave es requerida",
      path: ["docKey"],
    },
  );

export const documentSchema = createDocumentSchema.extend({
  id: z.string(),
  type: z.string(),
  owner: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  size: z.string(),
//   shared: z.boolean(),
//   sharedWith: z.array(z.string()),
});

export const unlockDocumentSchema = z.object({
  key: z.string().min(1, "La clave es requerida"),
});

export type CreateDocumentForm = z.infer<typeof createDocumentSchema>;

export type IDocument = z.infer<typeof documentSchema>;

export type UnlockDocumentForm = z.infer<typeof unlockDocumentSchema>;
