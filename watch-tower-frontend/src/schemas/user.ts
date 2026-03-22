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

  // status: z.boolean(),


  password: z
    .string("contrase;a requerida")
    .min(6, "El PIN debe tener mínimo 6 dígitos"),
  // status: z.boolean().default(true),

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
  });

export type IUserForm = z.infer<typeof userCreateSchema>;
export type IUser = z.infer<typeof userSchema>;
