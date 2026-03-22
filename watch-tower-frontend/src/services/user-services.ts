import { axiosClient } from "../lib/axios";
import type { IUser, IUserForm } from "../schemas/user";

export const getAllUsers = async () => {
  const res = await axiosClient<IUser[]>("/user/all");
  return res.data;
};

export const createuser = async (user: IUserForm) => {
  return await axiosClient.post<IUserForm>("/sign-in", user);
};
