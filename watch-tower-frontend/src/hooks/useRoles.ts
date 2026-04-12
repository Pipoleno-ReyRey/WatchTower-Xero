import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createRole,
  getAllRoles,
  updateRole,
} from "../services/roles-services";
import type { CreateRole, UpdateRole } from "../schemas/role";
import { queryClient } from "../lib/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useRoles = () => {
  const navigate = useNavigate();
  const roleQuery = useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  const roleMutation = useMutation({
    mutationFn: (data: CreateRole) => createRole(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["documents"] });
      navigate("/roles");
      toast.success("Rol creado correctamente");
    },

    onError: () => {
      toast.error("Error al crear el rol");
    },
  });
  const updateRoleMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRole }) =>
      updateRole(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["roles"] });
      navigate("/roles");
      toast.success("Rol actualizado correctamente");
    },

    onError: () => {
      toast.error("Error al actualizar el rol");
    },
  });
  return {
    roleQuery,
    roleMutation,
    updateRoleMutation,
  };
};
