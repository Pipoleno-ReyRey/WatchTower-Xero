import { useQuery } from "@tanstack/react-query";
import { getAllDocument } from "../services/document-service";

export const useDocument = () => {
  const documentQuery = useQuery({
    queryKey: ["documents"],
    queryFn: getAllDocument,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  return {
    documentQuery,
  };
};
