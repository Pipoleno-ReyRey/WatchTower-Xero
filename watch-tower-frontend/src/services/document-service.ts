import { axiosClient } from "../lib/axios";
import type { IDocument } from "../schemas/document";

export const getAllDocument = async () => {
  const res = await axiosClient<IDocument[]>("/doc/all");
  return res.data;
};
