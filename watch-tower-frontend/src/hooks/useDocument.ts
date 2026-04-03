import { useMutation, useQuery } from "@tanstack/react-query";
import { createDocument, getAllDocument } from "../services/document-service";
import { queryClient } from "../lib/react-query";
import type { CreateDocumentForm } from "../schemas/document";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useDocument = () => {
  const navigate = useNavigate();

  const documentQuery = useQuery({
    queryKey: ["documents"],
    queryFn: getAllDocument,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  const documentMutation = useMutation({
    mutationFn: (doc: CreateDocumentForm) => createDocument(doc),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["documents"] });

      navigate("/documents");
      await Swal.fire({
        icon: "success",
        title: "Documento creado",
        text: "Se guardó correctamente",
        confirmButtonText: "OK",
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el documento",
      });
    },
  });

  return {
    documentQuery,
    documentMutation,
  };
};
