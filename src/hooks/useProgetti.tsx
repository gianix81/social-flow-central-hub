
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipo per un progetto
export type Progetto = {
  id: number;
  nome: string;
  clienteId: number;
  obiettivi?: string;
  budget?: string;
  dataInizio?: string;
  dataScadenza?: string;
  stato: string;
  operatoriIds: number[];
  attivitaCompletate?: number;
  totaleAttivita?: number;
};

// Tipo per i dati di un nuovo progetto (senza id)
export type NuovoProgetto = Omit<Progetto, 'id'>;

// Stati possibili di un progetto
export const statiProgetto = [
  "Attivo",
  "In Corso",
  "Pianificazione",
  "Completato",
  "In Pausa",
  "Cancellato"
];

// Dati di esempio
const progettiIniziali: Progetto[] = [
  { 
    id: 101, 
    nome: 'Rilancio Sito Web', 
    clienteId: 1,
    stato: 'In Corso', 
    dataScadenza: '30 Giu 2025',
    operatoriIds: [1, 2, 3],
    attivitaCompletate: 8,
    totaleAttivita: 15,
    obiettivi: "Aumentare il traffico organico del 20% entro Q3"
  },
  { 
    id: 102, 
    nome: 'Campagna Social Media', 
    clienteId: 1,
    stato: 'Attivo', 
    dataScadenza: 'Continuo',
    operatoriIds: [1, 2],
    attivitaCompletate: 12,
    totaleAttivita: 20
  },
  { 
    id: 201, 
    nome: 'Collezione Estiva', 
    clienteId: 2,
    stato: 'Attivo', 
    dataScadenza: '15 Giu 2025',
    operatoriIds: [2, 3],
    attivitaCompletate: 5,
    totaleAttivita: 12
  },
  { 
    id: 202, 
    nome: 'Programma Influencer', 
    clienteId: 2,
    stato: 'In Corso', 
    dataScadenza: 'Continuo',
    operatoriIds: [1],
    attivitaCompletate: 3,
    totaleAttivita: 8
  },
  { 
    id: 301, 
    nome: 'Campagna Sostenibilità', 
    clienteId: 3,
    stato: 'Pianificazione', 
    dataScadenza: '20 Lug 2025',
    operatoriIds: [1, 3],
    attivitaCompletate: 2,
    totaleAttivita: 10
  }
];

// Interface per lo store dei progetti
interface ProgettiStore {
  progetti: Progetto[];
  aggiungiProgetto: (nuovoProgetto: NuovoProgetto) => void;
  modificaProgetto: (id: number, progetto: NuovoProgetto) => void;
  eliminaProgetto: (id: number) => void;
  getProgettoById: (id: number) => Progetto | undefined;
  getProgettiByClienteId: (clienteId: number) => Progetto[];
  getProgettiByOperatoreId: (operatoreId: number) => Progetto[];
}

// Creazione dello store Zustand
export const useProgetti = create<ProgettiStore>()(
  persist(
    (set, get) => ({
      progetti: progettiIniziali,
      
      aggiungiProgetto: (nuovoProgetto) => {
        set((state) => {
          const idMassimo = state.progetti.reduce((max, prog) => Math.max(max, prog.id), 0);
          return {
            progetti: [
              ...state.progetti,
              { ...nuovoProgetto, id: idMassimo + 1 }
            ]
          };
        });
      },
      
      modificaProgetto: (id, progettoAggiornato) => {
        set((state) => ({
          progetti: state.progetti.map((prog) => 
            prog.id === id ? { ...prog, ...progettoAggiornato } : prog
          )
        }));
      },
      
      eliminaProgetto: (id) => {
        set((state) => ({
          progetti: state.progetti.filter((prog) => prog.id !== id)
        }));
      },
      
      getProgettoById: (id) => {
        return get().progetti.find((prog) => prog.id === id);
      },
      
      getProgettiByClienteId: (clienteId) => {
        return get().progetti.filter((prog) => prog.clienteId === clienteId);
      },
      
      getProgettiByOperatoreId: (operatoreId) => {
        return get().progetti.filter((prog) => prog.operatoriIds.includes(operatoreId));
      }
    }),
    {
      name: "progetti-storage", // nome usato per salvare nel localStorage
    }
  )
);
