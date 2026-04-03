import { useQuery } from "@tanstack/react-query";
import { getLogs } from "../services/audit-services";

export const useAudit = () => {
  const auditQuery = useQuery({
    queryKey: ["audit"],
    queryFn: getLogs,
  });
  return { auditQuery };
};
