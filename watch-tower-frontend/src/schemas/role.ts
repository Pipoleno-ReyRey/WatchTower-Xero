import { z } from "zod";

export const roleSchema = z.object({
  id: z.number(),
  role: z.string({ message: "El role es requerido" }),
  description: z.string().optional(),
});

export const createRoleSchema = roleSchema.omit({
  id: true,
});

export const updateRoleSchema = roleSchema.partial();

export const userRoleSchema = roleSchema.omit({
  description: true,
});

export type Role = z.infer<typeof roleSchema>;

export type UserRole =  z.infer<typeof userRoleSchema>;
export type CreateRole = z.infer<typeof createRoleSchema>;
export type UpdateRole = z.infer<typeof updateRoleSchema>;
