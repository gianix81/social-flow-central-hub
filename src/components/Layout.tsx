
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import BarraSuperiore from "./BarraSuperiore";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const { setOpen } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden w-full">
        <BarraSuperiore />
        <main className="flex-1 overflow-auto p-3 md:p-6">
          {/* Mobile menu button that's always visible */}
          {isMobile && (
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg border-2 bg-white"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
