import { Navigate, Outlet } from "react-router-dom";
// import { useStore } from "../store/store";
import { isTokenValid } from "../utils/auth";

export const ProtectedAuthRoute = () => {
  // const valid = isTokenValid();

  // if (valid) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <Outlet />;
};
