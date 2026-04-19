import { useQuery } from "@tanstack/react-query";

export const useUserConfig = () => {
  const userConfigQuery = useQuery({
    queryKey: ["user-config"],
  });

  return {
    userConfigQuery,
  };
};
