import { z } from "zod";
import { roleSchema } from "./role";

export const userCreateSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(80, "El nombre es demasiado largo"),

  userName: z
    .string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(30, "El usuario no puede exceder 30 caracteres"),

  email: z.string().email("Debe ser un email válido"),

  roles: z.array(roleSchema).min(1),

  password: z
    .string("contrase;a requerida")
    .min(6, "El PIN debe tener mínimo 6 dígitos"),

  pin: z
    .string()
    .min(4, "El PIN debe tener mínimo 4 dígitos")
    .max(6, "El PIN no puede tener más de 6 dígitos")
    .regex(/^\d+$/, "El PIN solo puede contener números"),
});

export const userSchema = userCreateSchema
  .omit({ pin: true, password: true })
  .extend({
    id: z.number(),
    status: z.boolean(),
    risk: z.string().optional(),

    roles: z
      .array(roleSchema)
      .min(1)
      .transform((roles) => roles[0]),
  });
export const userUpdateSchema = userCreateSchema
  .omit({ password: true })
  // .extend({
  //   id: z.number(),
  //   // password: z.string().min(6).optional(),
  // });

export const userResponseSchema = z.object({
  id: z.number(),

  name: z.string(),
  userName: z.string(),
  email: z.email(),

  role: roleSchema,
  pin: z.string(),
  status: z.boolean().optional(),
  risk: z.string().optional(),
});

export type UpdateUserForm = z.infer<typeof userUpdateSchema>;
export type IUserForm = z.infer<typeof userCreateSchema>;
export type IUser = z.infer<typeof userSchema>;
export type IUserResponse = z.infer<typeof userResponseSchema>;
