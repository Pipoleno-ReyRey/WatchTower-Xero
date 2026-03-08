import { axiosClient } from "../lib/axios";
import type { AuthResponse, ILogin } from "../schemas/auth";

export const login = async (data: ILogin) => {
  const res = await axiosClient.post<AuthResponse>("/login", data);

  return res.data;
};
