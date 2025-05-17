
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Tipo per un promemoria
export type Promemoria = {
  id: number;
  titolo: string;
  messaggio: string;
  data: Date; // Data di scadenza
  letto: boolean;
  tipo: 'evento' | 'task' | 'progetto' | 'altro';
  entitaId?: number; // ID dell'evento, task o progetto collegato
};

// Hook per gestire i promemoria
export const usePromemoria = () => {
  const [promemoria, setPromemoria] = useState<Promemoria[]>([
    {
      id: 1,
      titolo: "Scadenza task",
      messaggio: "Completare bozza post Instagram per TechBolt",
      data: new Date(Date.now() + 1000 * 60 * 30), // 30 minuti da ora
      letto: false,
      tipo: 'task'
    },
    {
      id: 2,
      titolo: "Riunione cliente",
      messaggio: "Chiamata con FashionStyle per revisione campagna",
      data: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 ore da ora
      letto: false,
      tipo: 'evento'
    },
    {
      id: 3,
      titolo: "Scadenza progetto",
      messaggio: "Consegna finale progetto EcoGreen",
      data: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 giorni da ora
      letto: false,
      tipo: 'progetto'
    }
  ]);

  // Aggiunge un nuovo promemoria
  const aggiungiPromemoria = (nuovoPromemoria: Omit<Promemoria, 'id'>) => {
    const id = promemoria.length > 0 
      ? Math.max(...promemoria.map(p => p.id)) + 1 
      : 1;
    
    setPromemoria([...promemoria, { ...nuovoPromemoria, id }]);
  };

  // Segna un promemoria come letto
  const segnaComeLetto = (id: number) => {
    setPromemoria(promemoria.map(p => 
      p.id === id ? { ...p, letto: true } : p
    ));
  };

  // Rimuove un promemoria
  const rimuoviPromemoria = (id: number) => {
    setPromemoria(promemoria.filter(p => p.id !== id));
  };

  // Restituisce solo i promemoria non letti
  const promemoriaAttivi = promemoria.filter(p => !p.letto);

  return {
    promemoria,
    promemoriaAttivi,
    aggiungiPromemoria,
    segnaComeLetto,
    rimuoviPromemoria
  };
};

// Componente per visualizzare un promemoria
const ItemPromemoria = ({ 
  promemoria,
  onLetto,
  onRimanda,
  onVai
}: { 
  promemoria: Promemoria;
  onLetto: () => void;
  onRimanda: () => void;
  onVai: () => void;
}) => {
  // Formatta la data del promemoria in modo relativo (es. "tra 30 minuti")
  const formattaDataRelativa = (data: Date): string => {
    const now = new Date();
    const diffInMinuti = Math.floor((data.getTime() - now.getTime()) / (1000 * 60));
    
    if (diffInMinuti < 0) {
      return "Scaduto";
    } else if (diffInMinuti < 60) {
      return `Tra ${diffInMinuti} minuti`;
    } else if (diffInMinuti < 60 * 24) {
      const ore = Math.floor(diffInMinuti / 60);
      return `Tra ${ore} ${ore === 1 ? 'ora' : 'ore'}`;
    } else {
      const giorni = Math.floor(diffInMinuti / (60 * 24));
      return `Tra ${giorni} ${giorni === 1 ? 'giorno' : 'giorni'}`;
    }
  };

  // Colori per tipo di promemoria
  const getColorePerTipo = (tipo: string): string => {
    switch (tipo) {
      case 'evento':
        return 'bg-blue-50 text-blue-700';
      case 'task':
        return 'bg-amber-50 text-amber-700';
      case 'progetto':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="p-3 border-b last:border-none hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-sm">{promemoria.titolo}</h4>
        <span className={`text-xs px-2 py-0.5 rounded-full ${getColorePerTipo(promemoria.tipo)}`}>
          {formattaDataRelativa(promemoria.data)}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{promemoria.messaggio}</p>
      <div className="flex gap-2 mt-2">
        <Button variant="ghost" size="sm" className="text-xs px-2 h-7" onClick={onVai}>
          Vai
        </Button>
        <Button variant="ghost" size="sm" className="text-xs px-2 h-7" onClick={onRimanda}>
          Rimanda
        </Button>
        <Button variant="ghost" size="sm" className="text-xs px-2 h-7" onClick={onLetto}>
          Segna come letto
        </Button>
      </div>
    </div>
  );
};

// Componente principale per le notifiche
export const SvegliPromemoria = () => {
  const { promemoriaAttivi, segnaComeLetto, aggiungiPromemoria, rimuoviPromemoria } = usePromemoria();
  const { toast } = useToast();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Controlla periodicamente i promemoria per mostrare notifiche
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      
      // Cerca promemoria che scadono nei prossimi 5 minuti
      promemoriaAttivi.forEach(promemoria => {
        const diffInMinuti = Math.floor((promemoria.data.getTime() - now.getTime()) / (1000 * 60));
        
        if (diffInMinuti <= 5 && diffInMinuti >= 0) {
          // Mostra una notifica toast
          toast({
            title: `${promemoria.titolo}`,
            description: promemoria.messaggio,
            duration: 10000, // 10 secondi
          });
        }
      });
    }, 60000); // Controlla ogni minuto
    
    return () => clearInterval(intervalId);
  }, [promemoriaAttivi, toast]);

  // Funzione per gestire il rinvio di un promemoria
  const rimandaPromemoria = (id: number) => {
    // Trova il promemoria
    const promemoria = promemoriaAttivi.find(p => p.id === id);
    if (!promemoria) return;
    
    // Rimuovi il vecchio promemoria
    rimuoviPromemoria(id);
    
    // Crea un nuovo promemoria con data posticipata di 30 minuti
    const nuovaData = new Date(promemoria.data.getTime() + 30 * 60 * 1000);
    aggiungiPromemoria({
      ...promemoria,
      data: nuovaData,
      letto: false
    });
    
    // Chiudi il dropdown
    setDropdownOpen(false);
    
    // Mostra conferma
    toast({
      title: "Promemoria posticipato",
      description: "Il promemoria è stato posticipato di 30 minuti.",
    });
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {promemoriaAttivi.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {promemoriaAttivi.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-3 font-medium border-b">
          <h3>Promemoria</h3>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {promemoriaAttivi.length > 0 ? (
            promemoriaAttivi.map(promemoria => (
              <ItemPromemoria 
                key={promemoria.id}
                promemoria={promemoria}
                onLetto={() => {
                  segnaComeLetto(promemoria.id);
                  toast({
                    title: "Promemoria letto",
                    description: "Il promemoria è stato segnato come letto.",
                  });
                }}
                onRimanda={() => rimandaPromemoria(promemoria.id)}
                onVai={() => {
                  // Simulazione di navigazione
                  segnaComeLetto(promemoria.id);
                  setDropdownOpen(false);
                }}
              />
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>Non hai promemoria attivi.</p>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center cursor-default" asChild>
          <Button variant="ghost" size="sm" className="w-full">
            Gestisci tutti i promemoria
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
