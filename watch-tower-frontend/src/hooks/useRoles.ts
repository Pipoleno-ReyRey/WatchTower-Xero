import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../services/roles-services";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};
