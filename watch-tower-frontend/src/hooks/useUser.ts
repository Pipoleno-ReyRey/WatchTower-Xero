import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/user-services";

export const useUser = () => {
  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  //   const userQuery = useQuery({
  //     queryKey: ["user", id],
  //     queryFn: () => getUserById(id!),
  //     enabled: !!id, // solo corre si hay id
  //     staleTime: 1000 * 60 * 5,
  //   });

  return {
    // usersQuery,
    userQuery,
  };
};
