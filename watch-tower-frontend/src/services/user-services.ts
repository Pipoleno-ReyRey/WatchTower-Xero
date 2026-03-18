import { axiosClient } from "../lib/axios";
import type { IUser } from "../schemas/user";

export const getAllUsers = async () => {
  const res = await axiosClient<IUser[]>("/user/all");
  return res.data;
};
