import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";

import AppSidebar from "../components/common/AppSidebar";
import { MobileHeader } from "../components/common/MobileHeader";
import { ToastContainer } from "react-toastify";

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <MobileHeader />

        <main className="flex flex-1 flex-col p-4">
          <Outlet />
        </main>
      </SidebarInset>
      <ToastContainer />
    </SidebarProvider>
  );
};
