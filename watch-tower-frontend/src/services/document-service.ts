import { axiosClient } from "../lib/axios";
import type { CreateDocumentForm, IDocument } from "../schemas/document";

export const getAllDocument = async () => {
  const res = await axiosClient<IDocument[]>("/doc/all");
  return res.data;
};

export const createDocument = async (doc: CreateDocumentForm) => {
  const res = await axiosClient.post<CreateDocumentForm>(
    "/doc/new/create",
    doc,
  );
  return res.data;
};
