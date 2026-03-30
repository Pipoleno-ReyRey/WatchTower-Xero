import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/auth";
import type { Role } from "../schemas/role";
import { getCurrentUser } from "../lib/axios";

type Props = {
  allowedRoles?: string[];
};

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const valid = isTokenValid();
  const user = getCurrentUser();

  if (!valid) {
    localStorage.removeItem("currentUser");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    const hasRole = user?.role?.some((r: Role) =>
      allowedRoles.includes(r.role),
    );

    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};
