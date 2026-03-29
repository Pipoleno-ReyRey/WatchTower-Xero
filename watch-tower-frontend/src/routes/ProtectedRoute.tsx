import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

export const ProtectedRoute = () => {
  const valid = isTokenValid();

  if (!valid) {
    localStorage.removeItem("currentUser");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};