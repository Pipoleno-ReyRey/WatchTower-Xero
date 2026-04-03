import { useMutation, useQuery } from "@tanstack/react-query";
import { createuser, getAllUsers } from "../services/user-services";
import type { IUserForm } from "../schemas/user";
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

  const createUserMutation = useMutation({
    mutationFn: (user: IUserForm) => createuser(user),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/documents");
      // await Swal.fire({
      //   icon: "success",
      //   title: "Documento creado",
      //   text: "Se guardó correctamente",
      //   confirmButtonText: "OK",
      // });
      toast.success("Usuario creado correctamente");
    },
    onError: () => {
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: "No se pudo crear el usuario",
      // });
      toast.error("Error al crear el usuario");
    },
  });

  // const updateUserMutation = useMutation({
  //   mutationFn: ({ id, data }: { id: number; data: UserForm }) =>
  //     updateUser(id, data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["users"] });
  //   },
  // });

  return {
    userQuery,
    createUserMutation,
    // updateUserMutation,
  };
};
