import axios from "axios";
import type { AuthResponse, ILogin } from "../schemas/auth";

export const login = async (data: ILogin) => {
  const res = await axios.post<AuthResponse>(
    `${import.meta.env.VITE_API_URL}/login`,
    data,
  );

  return res.data;
};
