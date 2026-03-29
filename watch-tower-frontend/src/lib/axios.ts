import axios from "axios";

import { authResponseSchema, type AuthResponse } from "../schemas/auth";

export const getCurrentUser = (): AuthResponse | null => {
  const data = localStorage.getItem("currentUser");

  if (!data) return null;

  try {
    return authResponseSchema.parse(JSON.parse(data));
  } catch (error) {
    console.error("Invalid user in localStorage", error);
    return null;
  }
};

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

axiosClient.interceptors.request.use((config) => {
  const currentUser = getCurrentUser();

  if (currentUser?.token && config.headers) {
    config.headers.set("token", currentUser.token);
  }

  return config;
});

// 🔹 Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log(error);

      // opcional:
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
