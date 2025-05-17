
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipo per un operatore
export type Operatore = {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  note?: string;
  avatar?: string;
};

// Tipo per i dati di un nuovo operatore (senza id)
export type NuovoOperatore = Omit<Operatore, 'id'>;

// Ruoli predefiniti per gli operatori
export const ruoliOperatore = [
  "Project Manager SMM",
  "Copywriter",
  "Graphic Designer",
  "Social Media Specialist",
  "Ads Specialist",
  "Content Creator",
  "Video Editor",
  "Fotografo"
];

// Dati di esempio
const operatoriIniziali: Operatore[] = [
  {
    id: 1,
    nome: "Marco",
    cognome: "Rossi",
    email: "marco.rossi@example.com",
    ruolo: "Project Manager SMM",
    note: "Specializzato in strategie digitali B2B"
  },
  {
    id: 2,
    nome: "Laura",
    cognome: "Bianchi",
    email: "laura.bianchi@example.com",
    ruolo: "Copywriter",
    note: "Esperienza in content marketing per il settore moda"
  },
  {
    id: 3,
    nome: "Alessandro",
    cognome: "Verdi",
    email: "alessandro.verdi@example.com",
    ruolo: "Graphic Designer",
    note: "Specializzato in visual identity e branding"
  }
];

// Interface per lo store degli operatori
interface OperatoriStore {
  operatori: Operatore[];
  aggiungiOperatore: (nuovoOperatore: NuovoOperatore) => void;
  modificaOperatore: (id: number, operatore: NuovoOperatore) => void;
  eliminaOperatore: (id: number) => void;
  getOperatoreById: (id: number) => Operatore | undefined;
}

// Creazione dello store Zustand
export const useOperatori = create<OperatoriStore>()(
  persist(
    (set, get) => ({
      operatori: operatoriIniziali,
      
      aggiungiOperatore: (nuovoOperatore) => {
        set((state) => {
          const idMassimo = state.operatori.reduce((max, op) => Math.max(max, op.id), 0);
          return {
            operatori: [
              ...state.operatori,
              { ...nuovoOperatore, id: idMassimo + 1 }
            ]
          };
        });
      },
      
      modificaOperatore: (id, operatoreAggiornato) => {
        set((state) => ({
          operatori: state.operatori.map((op) => 
            op.id === id ? { ...op, ...operatoreAggiornato } : op
          )
        }));
      },
      
      eliminaOperatore: (id) => {
        set((state) => ({
          operatori: state.operatori.filter((op) => op.id !== id)
        }));
      },
      
      getOperatoreById: (id) => {
        return get().operatori.find((op) => op.id === id);
      }
    }),
    {
      name: "operatori-storage", // nome usato per salvare nel localStorage
    }
  )
);
