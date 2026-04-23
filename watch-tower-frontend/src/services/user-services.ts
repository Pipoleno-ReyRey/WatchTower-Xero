import { axiosClient } from "../lib/axios";
import type {
  IUser,
  IUserConfig,
  IUserForm,
  IUserResponse,
  // UpdateUserForm,
} from "../schemas/user";

export const getAllUsers = async () => {
  const res = await axiosClient<IUser[]>("/user/all");
  return res.data;
};

export const createuser = async (user: IUserForm) => {
  return await axiosClient.post<IUserForm>("/sign-in", user);
};

export const getUserById = async (id: number) => {
  const res = await axiosClient<IUserResponse>(`/user/get/${id}`);
  return res.data;
};

export const updateUser = async (user: IUserResponse) => {
  const res = await axiosClient.patch<IUserResponse>(`/user/update/`, user);
  return res.data;
};
export const blockUserById = async (id: number) => {
  const res = await axiosClient.put(`/user/block/${id}`, {});
  return res.data;
};
export const deleteUserById = async (id: number) => {
  const res = await axiosClient.delete(`/user/${id}`);
  return res.data;
};

export const changePassword = async (config: IUserConfig) => {
  const res = await axiosClient.patch("/user/change-pass/", config);
  return res.data;
};
