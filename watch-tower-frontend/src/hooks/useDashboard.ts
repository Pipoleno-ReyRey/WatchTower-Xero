import { useQuery } from "@tanstack/react-query";
import { getDataDashboard } from "../services/dashboard";

export const useDashboard = () => {
  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDataDashboard,
    staleTime: 1000 * 60 * 5,
  });
  return {
    dashboardQuery,
  };
};
