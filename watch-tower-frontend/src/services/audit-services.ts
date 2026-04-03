import { axiosClient } from "../lib/axios";
import type { IAudit } from "../schemas/audit";

export const getLogs = async () => {
  const res = await axiosClient.get<IAudit[]>("/audit/logs");
  return res.data;
};
