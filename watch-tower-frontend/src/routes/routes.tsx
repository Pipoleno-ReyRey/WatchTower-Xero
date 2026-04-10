import { createBrowserRouter, Navigate } from "react-router-dom";
import { UserPage } from "../pages/User/UserPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import { MainLayout } from "../layout/MainLayout";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { ProtectedAuthRoute } from "./ProtectedAuthRoute ";
import { DocumentPage } from "../pages/Document/DocumentPage";
import { CreateDocumentPage } from "../pages/Document/CreateDocumentPage";
import { DocumentDetailPage } from "../pages/Document/DocumentDetailsPage";
import { RolePage } from "../pages/RolePage";

// import { NotFoundPage } from "../pages/NotFoundPage";
import { AuditPage } from "../pages/AuditPage";
import { UserFormPage } from "../pages/User/UserFormPage";

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

            children: [
              {
                index: true,
                element: <UserPage />,
              },
              {
                path: "create",
                element: <UserFormPage />,
              },
              {
                path: ":id",
                element: <UserFormPage />,
              },
            ],
          },
          {
            path: "roles",
            element: <RolePage />,
          },
          {
            element: <ProtectedRoute allowedRoles={["admin"]} />,
            children: [
              {
                path: "dashboard",
                element: <DashboardPage />,
              },
            ],
          },
          {
            path: "documents",

            children: [
              {
                index: true,
                element: <DocumentPage />,
              },
              {
                path: "create",
                element: <CreateDocumentPage />,
              },
              {
                path: ":id",
                element: <DocumentDetailPage />,
              },
            ],
          },
          {
            path: "audit",
            element: <AuditPage />,
          },
        ],
      },
    ],
  },
  // { path: "/unauthorized", element: <NotFoundPage /> },

  { path: "*", element: <Navigate to="/login" replace /> },
]);
