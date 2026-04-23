import { createBrowserRouter, Navigate } from "react-router-dom";
import { UserPage } from "../pages/User/UserPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import { MainLayout } from "../layout/MainLayout";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { ProtectedAuthRoute } from "./ProtectedAuthRoute ";
import { DocumentPage } from "../pages/Document/DocumentPage";
import { DocumentDetailPage } from "../pages/Document/DocumentDetailsPage";
import { RolePage } from "../pages/RolePage";
import { AuditPage } from "../pages/AuditPage";
import { UserFormPage } from "../pages/User/UserFormPage";
import { DocumentFormPage } from "../pages/Document/DocumentFormPage";
import { ConfigurationPage } from "../pages/ConfigurationPage";
import { UnauthorizedPage } from "../pages/UnauthorizedPage";

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
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/documents" replace />,
          },

          {
            element: (
              <ProtectedRoute allowedRoles={["admin", "auditor", "user"]} />
            ),
            children: [
              {
                path: "documents",
                children: [
                  { index: true, element: <DocumentPage /> },
                  { path: "create", element: <DocumentFormPage /> },
                  { path: "edit/:id", element: <DocumentFormPage /> },
                  { path: ":id", element: <DocumentDetailPage /> },
                ],
              },
            ],
          },

          {
            element: (
              <ProtectedRoute allowedRoles={["admin", "auditor", "user"]} />
            ),
            children: [
              {
                path: "configuration",
                element: <ConfigurationPage />,
              },
            ],
          },

          {
            element: <ProtectedRoute allowedRoles={["admin", "auditor"]} />,
            children: [
              {
                path: "user",
                children: [
                  { index: true, element: <UserPage /> },
                  { path: "create", element: <UserFormPage /> },
                  { path: ":id", element: <UserFormPage /> },
                ],
              },
            ],
          },

          {
            element: <ProtectedRoute allowedRoles={["admin", "auditor"]} />,
            children: [
              {
                path: "audit",
                element: <AuditPage />,
              },
            ],
          },

          {
            element: <ProtectedRoute allowedRoles={["admin"]} />,
            children: [
              {
                path: "dashboard",
                element: <DashboardPage />,
              },
              {
                path: "roles",
                element: <RolePage />,
              },
            ],
          },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
  { path: "unauthorized", element: <UnauthorizedPage /> },
]);
