import { getCurrentUser } from "../lib/axios";

export const isTokenValid = (): boolean => {
  const currentUser = getCurrentUser();

  if (!currentUser?.token) return false;

  try {
    const payload = JSON.parse(atob(currentUser.token.split(".")[1]));

    const currentTime = Date.now() / 1000;

    return payload.exp > currentTime;
  } catch {
    return false;
  }
};