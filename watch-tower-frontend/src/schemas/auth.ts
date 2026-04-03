import z from "zod";

export const loginSchema = z.object({
  // email: z.string().min(1, "Email requerido").email("Email inválido"),
  user: z.string().min(1, "usuario requerido"),
  password: z
    .string()
    .min(1, "Password requerido")
    .min(6, "Mínimo 6 caracteres"),
  pin: z
    .string()
    .min(6, "PIN debe tener 6 dígitos")
    .max(6, "PIN debe tener 6 dígitos"),
});

// 🔹 Schema
export const authResponseSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  role: z.array(
    z.object({
      id: z.number(),
      role: z.string(),
    }),
  ),
  token: z.string(),
});

// 🔹 Tipo inferido
export type AuthResponse = z.infer<typeof authResponseSchema>;
// export type AuthResponse = {
//   userName: string;
//   email: string;
//   role: Role[];
//   token: string;
// };

// {
//     "userName": "jugonzales",
//     "email": "jugonzales@gmail.com",
//     "role": [
//         {
//             "id": 5,
//             "role": "document_manager"
//         }
//     ],
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Imp1Z29uemFsZXMiLCJlbWFpbCI6Imp1Z29uemFsZXNAZ21haWwuY29tIiwicm9sZSI6W3siaWQiOjUsInJvbGUiOiJkb2N1bWVudF9tYW5hZ2VyIn1dLCJpYXQiOjE3NzI5MzY0NjUsImV4cCI6MTc3Mjk0MDA2NX0.LxqgFShS5nKEwY67yNA-mBCE65hBXabX6EdQ0cCA3R8"
// }

export type ILogin = z.infer<typeof loginSchema>;
