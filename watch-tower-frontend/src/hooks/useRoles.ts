import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../services/roles-services";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
  });
};
