import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";

import AppSidebar from "../components/common/AppSidebar";
import { MobileHeader } from "../components/common/MobileHeader";
import { ToastContainer } from "react-toastify";

import { Loader } from "../components/common/Loader";
import { useIsFetching } from "@tanstack/react-query";
import { useStore } from "../store/appStore";

export const MainLayout = () => {
  const fetching = useIsFetching();
  const loading = useStore((s) => s.loading);
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <MobileHeader />

        <main className="flex flex-1 flex-col p-4 overflow-hidden">
          <Outlet />
          {fetching > 0 && <Loader />}
          {loading && <Loader />}
        </main>
      </SidebarInset>
      <ToastContainer />
    </SidebarProvider>
  );
};
