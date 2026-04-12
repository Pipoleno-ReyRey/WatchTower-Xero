import { axiosClient } from "../lib/axios";
import type { CreateRole, Role, UpdateRole, UserRole } from "../schemas/role";

export const getAllRoles = async () => {
  const res = await axiosClient.get<Role[]>("/roles/all");

  return res.data;
};

export const getRoles = async () => {
  const res = await axiosClient.get<UserRole[]>("/roles/all");

  return res.data;
};

export const createRole = async (data: CreateRole) => {
  const res = await axiosClient.post("/role", data);
  return res.data;
};

export const updateRole = async (id: number, data: UpdateRole) => {
  const res = await axiosClient.put(`/role/${id}`, data);
  return res.data;
};
