import { axiosClient } from "../lib/axios";
import type { Role } from "../schemas/role";

export const getAllRoles = async () => {
  const res = await axiosClient.get<Role[]>("/roles/all");

  return res.data;
};
