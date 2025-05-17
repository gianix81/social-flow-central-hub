
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { SvegliPromemoria } from './SvegliPromemoria';

const NotificheDropdown = () => {
  // Qui ora utilizziamo direttamente il componente SvegliPromemoria
  // che include già tutta la logica per i promemoria
  return (
    <SvegliPromemoria />
  );
};

export default NotificheDropdown;
