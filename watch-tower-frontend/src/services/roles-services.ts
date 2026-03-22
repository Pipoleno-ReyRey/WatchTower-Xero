import { axiosClient } from "../lib/axios";
import type { Role, UserRole } from "../schemas/role";

export const getAllRoles = async () => {
  const res = await axiosClient.get<Role[]>("/roles/all");

  return res.data;
};

export const getRoles = async () => {
  const res = await axiosClient.get<UserRole[]>("/roles/all");

  return res.data;
};
