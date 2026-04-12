import { useParams } from "react-router-dom";
import { DocumentForm } from "../../components/document/DocumentForm";
import { useDocument } from "../../hooks/useDocument";
import { DocumentUnlockGate } from "../../components/document/DocumentUnlockGate";

export const DocumentFormPage = () => {
  const { id } = useParams();
  const { documentQuery } = useDocument();

  const isEdit = !!id;


  const document = isEdit
    ? documentQuery.data?.find((d) => d.id === Number(id))
    : null;

  if (isEdit && !document) {
    return <p>Documento no encontrado</p>;
  }

  if (!isEdit) {
    return <DocumentForm document={null} />;
  }
  return (
    <DocumentUnlockGate
      documentId={document!.id}
      isProtected={document!.hasPass}
    >
      <DocumentForm document={document} />
    </DocumentUnlockGate>
  );
};