
import { Bell, Search, SidebarOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const getPageTitle = (pathname: string): string => {
  const path = pathname.split('/')[1];
  switch (path) {
    case '':
      return 'Dashboard';
    case 'clients':
      return 'Client Management';
    case 'projects':
      return 'Projects';
    case 'calendar':
      return 'Calendar & Planning';
    case 'ideas':
      return 'Idea Bank';
    case 'content':
      return 'Content Hub';
    case 'web-watch':
      return 'Web Watch';
    case 'team':
      return 'Team Management';
    default:
      return 'SMM Central Hub';
  }
};

const TopNav = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="p-2 rounded-md hover:bg-gray-100 md:hidden">
            <SidebarOpen className="h-5 w-5 text-gray-500" />
          </SidebarTrigger>
          <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:block relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="pl-9 h-9 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
