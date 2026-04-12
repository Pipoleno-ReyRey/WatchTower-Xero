import {
  useMutation,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  blockUserById,
  createuser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/user-services";
import type { IUserForm, IUserResponse } from "../schemas/user";
import { queryClient } from "../lib/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useUser = () => {
  const navigate = useNavigate();
  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  const useUserByIdQuery = (
    id: number,
    options?: UseQueryOptions<IUserResponse, Error>,
  ) =>
    useQuery({
      queryKey: ["user"],
      queryFn: () => getUserById(id),
      refetchOnWindowFocus: false,
      enabled: !!id,
      staleTime: 0,
      gcTime: 0,
      ...options,
    });

  const createUserMutation = useMutation({
    mutationFn: (user: IUserForm) => createuser(user),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/documents");

      toast.success("Usuario creado correctamente");
    },
    onError: () => {
      toast.error("Error al crear el usuario");
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (data: IUserResponse) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const blockUserMutation = useMutation({
    mutationFn: (id: number) => blockUserById(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/user");
      toast.success("Usuario modificado correctamente");
    },

    onError: () => {
      toast.error("Error al modificar el usuario");
    },
  });
  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => deleteUserById(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/user");
      toast.success("Usuario eliminado correctamente");
    },

    onError: () => {
      toast.error("Error al eliminar el usuario");
    },
  });

  return {
    userQuery,
    useUserByIdQuery,
    createUserMutation,
    updateUserMutation,
    blockUserMutation,
    deleteUserMutation,
  };
};
