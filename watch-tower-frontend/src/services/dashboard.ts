import { axiosClient } from "../lib/axios";
import type { IDashboard } from "../schemas/dashboard";

export const getDataDashboard = async () => {
  const res = await axiosClient.get<IDashboard>("/dashboard");
  return res.data;
};
