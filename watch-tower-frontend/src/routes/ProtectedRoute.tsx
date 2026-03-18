import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

export const ProtectedRoute = () => {
  const valid = isTokenValid();

  if (!valid) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};