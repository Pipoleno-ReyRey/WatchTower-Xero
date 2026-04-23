import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../services/user-services";
import type { IUserConfig } from "../schemas/user";
import { toast } from "react-toastify";

export const useUserConfig = () => {
  const userConfigMutation = useMutation({
    mutationFn: (data: IUserConfig) => changePassword(data),
    onSuccess: () => {
      toast.success("Credenciales actualizadas correctamente");
    },
    onError: () => {
      toast.error("Contraseña incorrecta");
    },
  });

  return {
    userConfigMutation,
  };
};
