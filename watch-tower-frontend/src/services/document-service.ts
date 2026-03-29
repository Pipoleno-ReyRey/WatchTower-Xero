import { axiosClient } from "../lib/axios";
import type {
  CreateDocumentForm,
  IDocument,
  UnLockResponse,
} from "../schemas/document";

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

export const unLockDocument = async (id: number, password: string) => {
  const res = await axiosClient.post<UnLockResponse>(`/doc/${id}`, {
    pass: password,
  });
  return res.data;
};
