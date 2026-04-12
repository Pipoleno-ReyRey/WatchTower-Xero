import { z } from "zod";

export const baseDocumentSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  owner: z.string(),
  content: z.string().min(1, "El contenido es requerido"),
  hasPass: z.boolean(),
  pass: z.string().optional(),
});

export const createDocumentSchema = baseDocumentSchema.refine(
  (data) => !data.hasPass || (data.pass && data.pass.length > 0),
  {
    message: "La clave es requerida",
    path: ["pass"],
  },
);

export const documentSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  owner: z.string(),
  hasPass: z.boolean(),
  content: z.string(),
});

// Para desbloquear documento
export const unlockDocumentSchema = z.object({
  key: z.string().min(1, "La clave es requerida"),
});

export const updateDocumentSchema = baseDocumentSchema
  // .partial()
  // .omit({ pass: true, hasPass: true })
  .extend({
    id: z.number().optional(),
  });

// Types
export type CreateDocumentForm = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentForm = z.infer<typeof updateDocumentSchema>;

export type IDocument = z.infer<typeof documentSchema>;
export type UnlockDocumentForm = z.infer<typeof unlockDocumentSchema>;
export type UnLockResponse = {
  content: string;
};
