import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { 
  Users,
  LayoutGrid,
  Briefcase,
  Calendar,
  Lightbulb,
  Mail,
  Globe,
  Settings,
  PanelLeft,
  ChevronRight,
  Menu,
  UserPlus
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Il logo con testo condizionale basato sullo stato della sidebar
const Logo = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="w-8 h-8 rounded-md bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-bold text-lg">
        S
      </div>
      {isExpanded && (
        <div className="font-semibold text-lg overflow-hidden">
          SMM Hub
        </div>
      )}
    </div>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

// Componente per ciascun elemento di navigazione
const NavItem = ({ icon: Icon, label, to, active, onClick }: NavItemProps) => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    if (isMobile && onClick) {
      onClick();
    }
  };
  
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start gap-4 px-2",
        isExpanded ? "px-4" : "px-0 justify-center",
        active && "bg-brand-50 text-brand hover:bg-brand-100 hover:text-brand"
      )}
    >
      <Link to={to} onClick={handleClick}>
        <Icon className={cn("h-5 w-5", isExpanded ? "mr-2" : "mr-0")} />
        {isExpanded && <span>{label}</span>}
      </Link>
    </Button>
  );
};

// Il componente principale della sidebar
const AppSidebar = () => {
  const { state, setOpen } = useSidebar();
  const isExpanded = state === "expanded";
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };
  
  // Funzione per chiudere la sidebar su mobile dopo la navigazione
  const handleNavItemClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <div
      className={cn(
        "relative border-r bg-card h-screen flex flex-col p-2 transition-all duration-300",
        isExpanded ? "w-64" : "w-16",
        isMobile && !isExpanded && "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between h-16 px-2">
        <Logo />
        {isExpanded && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="h-8 w-8"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Pulsante hamburger mobile per aprire la sidebar */}
      {isMobile && !isExpanded && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* Pulsante per espandere la sidebar quando collassata (solo desktop) */}
      {!isExpanded && !isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="absolute -right-3 top-10 h-6 w-6 rounded-full bg-background border shadow-sm hidden md:flex items-center justify-center"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      )}

      {/* Gruppo di navigazione superiore */}
      <div className="space-y-1 mt-6">
        <NavItem 
          icon={LayoutGrid} 
          label="Dashboard" 
          to="/" 
          active={location.pathname === "/"} 
          onClick={handleNavItemClick}
        />
        <NavItem 
          icon={Users} 
          label="Clienti" 
          to="/clienti" 
          active={isActive("/clienti")} 
          onClick={handleNavItemClick}
        />
        <NavItem 
          icon={UserPlus} 
          label="Collaboratori" 
          to="/collaboratori" 
          active={isActive("/collaboratori")} 
          onClick={handleNavItemClick}
        />
        <NavItem 
          icon={Briefcase} 
          label="Progetti" 
          to="/progetti" 
          active={isActive("/progetti")} 
          onClick={handleNavItemClick}
        />
        <NavItem 
          icon={Calendar} 
          label="Calendario" 
          to="/calendario" 
          active={isActive("/calendario")} 
          onClick={handleNavItemClick}
        />
        <NavItem 
          icon={Lightbulb} 
          label="Banca Idee" 
          to="/idee" 
          active={isActive("/idee")} 
          onClick={handleNavItemClick}
        />
        <NavItem 
          icon={Mail} 
          label="Email" 
          to="/contenuti" 
          active={isActive("/contenuti")} 
          onClick={handleNavItemClick}
        />
        <NavItem 
          icon={Globe} 
          label="Osservatorio Web" 
          to="/osservatorio-web" 
          active={isActive("/osservatorio-web")} 
          onClick={handleNavItemClick}
        />
      </div>

      {/* Sezione inferiore della sidebar */}
      <div className="mt-auto mb-4">
        <NavItem 
          icon={Settings} 
          label="Impostazioni" 
          to="/impostazioni" 
          active={isActive("/impostazioni")} 
          onClick={handleNavItemClick}
        />
      </div>
    </div>
  );
};

export default AppSidebar;
