import { useMutation, useQuery } from "@tanstack/react-query";
import { createRole, getAllRoles } from "../services/roles-services";
import type { CreateRole } from "../schemas/role";
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
  return {
    roleQuery,
    roleMutation,
  };
};
