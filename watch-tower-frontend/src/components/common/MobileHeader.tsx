import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export  function MobileHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex h-14 items-center border-b bg-background px-4 md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>

      <span className="ml-2 font-mono text-sm font-bold tracking-wider">
        WATCHTOWER
      </span>
    </header>
  );
}
