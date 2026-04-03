import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import AppSidebar from "../components/common/AppSidebar";
import { MobileHeader } from "../components/common/MobileHeader";
import { ToastContainer } from "react-toastify";
import { Loader } from "../components/common/Loader";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export const MainLayout = () => {
  const fetching = useIsFetching();
  const mutating = useIsMutating();

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="relative z-10">
        <MobileHeader />
        <main className="flex flex-1 flex-col p-4 overflow-hidden">
          <Outlet />

          {(fetching > 0 || mutating > 0) && <Loader />}
        </main>
      </SidebarInset>
      <ToastContainer />
    </SidebarProvider>
  );
};
