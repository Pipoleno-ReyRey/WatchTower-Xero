import {
  ChevronLeft,
  ChevronRight,
  Eye,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { NavLink } from "react-router-dom";
import { navItems } from "../../routes/nav-items";
import { getCurrentUser } from "../../lib/axios";
import { useTheme } from "next-themes";
import { useAuth } from "../../hooks/useAuth";

export default function AppSidebar() {
  const { state, toggleSidebar, openMobile, setOpenMobile } = useSidebar();

  const { theme, setTheme } = useTheme();
  const { logOut } = useAuth();

  const collapsed = state === "collapsed";
  const currentUser = getCurrentUser();

  return (
    <>
      {openMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:hidden
          ${openMobile ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar collapsible="icon" variant="inset" className="h-full border-r">
          <SidebarHeader>
            <div className="flex h-16 items-center gap-3 ">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Eye className="h-5 w-5" />
              </div>

              {!collapsed && (
                <div className="flex flex-col leading-tight">
                  <span className="font-mono text-sm font-bold tracking-wider">
                    WATCHTOWER
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-primary">
                    XERO
                  </span>
                </div>
              )}
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu className="px-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.path}>
                    <NavLink
                      to={item.path}
                      className="w-full"
                      onClick={() => setOpenMobile(false)}
                    >
                      {({ isActive }) => (
                        <SidebarMenuButton
                          tooltip={item.label}
                          isActive={isActive}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <Separator />

          <SidebarFooter>
            {!collapsed && (
              <div className="flex-col">
                <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {currentUser?.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <span className="text-sm font-medium">
                    {currentUser?.userName}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full bg-muted flex justify-start gap-4"
                >
                  {theme === "dark" ? <Moon /> : <Sun />}
                  {theme === "dark" ? "Modo lenny" : "Modo claro"}
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between px-2">
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                {collapsed ? <ChevronRight /> : <ChevronLeft />}
              </Button>

              {!collapsed && (
                <Button variant="ghost" size="sm" onClick={logOut}>
                  <LogOut className="mr-1.5 h-3.5 w-3.5" />
                  Logout
                </Button>
              )}
            </div>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>
      </div>

      {/*  DESKTOP SIDEBAR */}
      <div className="hidden lg:block">
        <Sidebar collapsible="icon" variant="inset" className="border-r">
          <SidebarHeader>
            <div className="flex h-16 items-center gap-3 ">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Eye className="h-5 w-5" />
              </div>
              {!collapsed && (
                <div className="flex flex-col leading-tight">
                  <span className="font-mono text-sm font-bold tracking-wider">
                    WATCHTOWER
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-primary">
                    XERO
                  </span>
                </div>
              )}
            </div>
          </SidebarHeader>

          {/* NAV */}
          <SidebarContent>
            <SidebarMenu className="px-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.path}>
                    <NavLink
                      to={item.path}
                      end={false}
                      className="w-full"
                      onClick={() => setOpenMobile(false)} 
                    >
                      {({ isActive }) => (
                        <SidebarMenuButton
                          tooltip={item.label}
                          isActive={isActive}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <Separator />

          {/* FOOTER */}
          <SidebarFooter>
            {!collapsed && (
              <div className="flex-col">
                <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {currentUser?.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {currentUser?.userName}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full bg-muted flex justify-start gap-4"
                  size={"lg"}
                >
                  {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                  {theme === "dark" ? "Modo lenny" : "Modo claro"}
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between px-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8"
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>

              {!collapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-8 text-xs text-muted-foreground hover:text-destructive"
                  onClick={logOut}
                >
                  <LogOut className="mr-1.5 h-3.5 w-3.5" />
                  Logout
                </Button>
              )}
            </div>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>
      </div>
    </>
  );
}
