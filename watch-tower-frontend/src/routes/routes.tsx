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
import { UserForm } from "../components/user/UserForm";

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
              { path: "create", element: <UserForm /> },
              { path: ":id", element: <UserForm /> },
            ],
          },
          {
            path: "roles",
            element: <RolePage />,
          },
          {
            path: "dashboard",
            index: true,
            element: <DashboardPage />,
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
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
]);
