
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useProgetti } from "./useProgetti";

export type TipoEvento = 
  | "Riunione" 
  | "Scadenza" 
  | "Pubblicazione" 
  | "Altro";

export type Evento = {
  id: number;
  titolo: string;
  descrizione?: string;
  dataInizio: Date;
  dataFine?: Date;
  progettoId?: number;
  operatoriIds: number[];
  tipo: TipoEvento;
  completato: boolean;
};

type EventoStore = {
  eventi: Evento[];
  aggiungiEvento: (evento: Omit<Evento, "id">) => void;
  modificaEvento: (id: number, evento: Partial<Evento>) => void;
  eliminaEvento: (id: number) => void;
  getEventiByProgettoId: (progettoId: number) => Evento[];
  getEventiByOperatoreId: (operatoreId: number) => Evento[];
  getEventiByData: (data: Date) => Evento[];
  getEventiByRange: (inizio: Date, fine: Date) => Evento[];
};

// Alcuni eventi di esempio
const eventiIniziali: Evento[] = [
  {
    id: 1,
    titolo: "Riunione di avvio progetto",
    descrizione: "Definizione degli obiettivi e della timeline",
    dataInizio: new Date(2025, 4, 20, 10, 0), // 20 Maggio 2025, 10:00
    dataFine: new Date(2025, 4, 20, 11, 30),  // 20 Maggio 2025, 11:30
    progettoId: 101,
    operatoriIds: [1, 2],
    tipo: "Riunione",
    completato: false
  },
  {
    id: 2,
    titolo: "Consegna bozza grafica",
    descrizione: "Consegna della prima bozza dei visual per la campagna",
    dataInizio: new Date(2025, 4, 22, 9, 0),  // 22 Maggio 2025, 9:00
    progettoId: 101,
    operatoriIds: [3],
    tipo: "Scadenza",
    completato: false
  },
  {
    id: 3,
    titolo: "Pubblicazione post Instagram",
    descrizione: "Lancio del primo post della campagna estiva",
    dataInizio: new Date(2025, 4, 25, 12, 0), // 25 Maggio 2025, 12:00
    progettoId: 201,
    operatoriIds: [2],
    tipo: "Pubblicazione",
    completato: false
  }
];

// Funzione per confrontare le date (solo giorno, mese e anno)
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// Funzione per verificare se un evento è in un range di date
const isEventInRange = (evento: Evento, inizio: Date, fine: Date): boolean => {
  const eventDate = new Date(evento.dataInizio);
  return eventDate >= inizio && eventDate <= fine;
};

export const useCalendario = create<EventoStore>()(
  persist(
    (set, get) => ({
      eventi: eventiIniziali,
      
      aggiungiEvento: (evento) => {
        set((state) => {
          const idMassimo = state.eventi.reduce((max, evt) => Math.max(max, evt.id), 0);
          return {
            eventi: [
              ...state.eventi,
              { ...evento, id: idMassimo + 1 }
            ]
          };
        });
      },
      
      modificaEvento: (id, evento) => {
        set((state) => ({
          eventi: state.eventi.map((evt) => 
            evt.id === id ? { ...evt, ...evento } : evt
          )
        }));
      },
      
      eliminaEvento: (id) => {
        set((state) => ({
          eventi: state.eventi.filter((evt) => evt.id !== id)
        }));
      },
      
      getEventiByProgettoId: (progettoId) => {
        return get().eventi.filter((evt) => evt.progettoId === progettoId);
      },
      
      getEventiByOperatoreId: (operatoreId) => {
        return get().eventi.filter((evt) => evt.operatoriIds.includes(operatoreId));
      },
      
      getEventiByData: (data) => {
        return get().eventi.filter((evt) => isSameDay(new Date(evt.dataInizio), data));
      },
      
      getEventiByRange: (inizio, fine) => {
        return get().eventi.filter((evt) => isEventInRange(evt, inizio, fine));
      }
    }),
    {
      name: "calendario-storage", // nome usato per salvare nel localStorage
    }
  )
);

// Funzione di utilità per ottenere eventi di progetto e renderli come eventi del calendario
export const useProgettieCalendario = () => {
  const { progetti } = useProgetti();
  const { eventi, aggiungiEvento } = useCalendario();
  
  // Funzione per convertire le scadenze di progetto in eventi del calendario
  const sincronizzaProgettiCalendario = () => {
    progetti.forEach(progetto => {
      if (progetto.dataScadenza) {
        // Controlla se esiste già un evento per la scadenza di questo progetto
        const scadenzaEsistente = eventi.some(
          event => event.progettoId === progetto.id && event.tipo === "Scadenza"
        );
        
        if (!scadenzaEsistente) {
          // Formato della data nel progetto: "30 Giu 2025" -> converte in Date
          const dataParts = progetto.dataScadenza.split(' ');
          if (dataParts.length === 3) {
            const meseMap: Record<string, number> = {
              "Gen": 0, "Feb": 1, "Mar": 2, "Apr": 3, "Mag": 4, "Giu": 5,
              "Lug": 6, "Ago": 7, "Set": 8, "Ott": 9, "Nov": 10, "Dic": 11
            };
            
            const giorno = parseInt(dataParts[0]);
            const mese = meseMap[dataParts[1].substring(0, 3)];
            const anno = parseInt(dataParts[2]);
            
            if (!isNaN(giorno) && mese !== undefined && !isNaN(anno)) {
              aggiungiEvento({
                titolo: `Scadenza: ${progetto.nome}`,
                descrizione: `Data di scadenza del progetto ${progetto.nome}`,
                dataInizio: new Date(anno, mese, giorno),
                progettoId: progetto.id,
                operatoriIds: progetto.operatoriIds,
                tipo: "Scadenza",
                completato: false
              });
            }
          }
        }
      }
    });
  };
  
  return { eventi, sincronizzaProgettiCalendario };
};
