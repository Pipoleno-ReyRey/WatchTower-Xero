import { useMutation, useQuery } from "@tanstack/react-query";
import { createDocument, getAllDocument } from "../services/document-service";
import { queryClient } from "../lib/react-query";
import type { CreateDocumentForm } from "../schemas/document";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useDocument = () => {
  const navigate = useNavigate();

  const documentQuery = useQuery({
    queryKey: ["documents"],
    queryFn: getAllDocument,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const documentMutation = useMutation({
    mutationFn: (doc: CreateDocumentForm) => createDocument(doc),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["documents"] });
      navigate("/documents");
      toast.success("Documento creado correctamente");
    },

    onError: () => {
      toast.error("Error al crear el documento");
    },
  });

  return {
    documentQuery,
    documentMutation,
  };
};
