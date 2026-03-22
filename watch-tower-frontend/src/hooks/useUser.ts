import { useMutation, useQuery } from "@tanstack/react-query";
import { createuser, getAllUsers } from "../services/user-services";
import type { IUserForm } from "../schemas/user";
import { queryClient } from "../lib/react-query";

export const useUser = () => {
  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });


  const createUserMutation = useMutation({
    mutationFn: (user: IUserForm) => createuser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
