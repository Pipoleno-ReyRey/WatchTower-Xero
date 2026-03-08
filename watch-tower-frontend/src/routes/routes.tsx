import { createBrowserRouter, Navigate } from "react-router-dom";
import { UserPage } from "../pages/UserPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import { MainLayout } from "../layout/MainLayout";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { ProtectedAuthRoute } from "./ProtectedAuthRoute ";

export const routes = createBrowserRouter([
  {
    element: <ProtectedAuthRoute />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "user",
            element: <UserPage />,
          },
          {
            path: "dashboard",
            index: true,
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
]);
