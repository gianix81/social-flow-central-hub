
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipo per un cliente
export type Cliente = {
  id: number;
  nome: string;
  settore?: string;
  referente?: string;
  email?: string;
  telefono?: string;
  piva?: string;
  indirizzo?: string;
  note?: string;
  contratto?: string;
  dataScadenzaContratto?: string;
  attivo: boolean;
};

// Tipo per i dati di un nuovo cliente (senza id)
export type NuovoCliente = Omit<Cliente, 'id'>;

// Dati di esempio
const clientiIniziali: Cliente[] = [
  {
    id: 1,
    nome: "TechBolt",
    settore: "Technology",
    referente: "Mario Bianchi",
    email: "mario.bianchi@techbolt.com",
    telefono: "+39 02 1234567",
    attivo: true,
    piva: "01234567890",
    note: "Cliente interessato soprattutto a campagne su LinkedIn"
  },
  {
    id: 2,
    nome: "FashionStyle",
    settore: "Fashion & Retail",
    referente: "Giulia Neri",
    email: "giulia.neri@fashionstyle.com",
    telefono: "+39 02 7654321",
    attivo: true,
    piva: "09876543210"
  },
  {
    id: 3,
    nome: "EcoGreen",
    settore: "Sustainability",
    referente: "Luca Verdi",
    email: "luca.verdi@ecogreen.com",
    telefono: "+39 02 9876543",
    attivo: true,
    piva: "45678901234"
  },
  {
    id: 4,
    nome: "HealthPlus",
    settore: "Healthcare",
    referente: "Anna Rossi",
    email: "anna.rossi@healthplus.com",
    telefono: "+39 02 3456789",
    attivo: false,
    piva: "56789012345"
  },
  {
    id: 5,
    nome: "FoodDelights",
    settore: "Food & Beverage",
    referente: "Paolo Marini",
    email: "paolo.marini@fooddelights.com",
    telefono: "+39 02 8765432",
    attivo: false,
    piva: "67890123456"
  }
];

// Interface per lo store dei clienti
interface ClientiStore {
  clienti: Cliente[];
  aggiungiCliente: (nuovoCliente: NuovoCliente) => void;
  modificaCliente: (id: number, cliente: NuovoCliente) => void;
  eliminaCliente: (id: number) => void;
  getClienteById: (id: number) => Cliente | undefined;
}

// Creazione dello store Zustand
export const useClienti = create<ClientiStore>()(
  persist(
    (set, get) => ({
      clienti: clientiIniziali,
      
      aggiungiCliente: (nuovoCliente) => {
        set((state) => {
          const idMassimo = state.clienti.reduce((max, cliente) => Math.max(max, cliente.id), 0);
          return {
            clienti: [
              ...state.clienti,
              { ...nuovoCliente, id: idMassimo + 1 }
            ]
          };
        });
      },
      
      modificaCliente: (id, clienteAggiornato) => {
        set((state) => ({
          clienti: state.clienti.map((cliente) => 
            cliente.id === id ? { ...cliente, ...clienteAggiornato } : cliente
          )
        }));
      },
      
      eliminaCliente: (id) => {
        set((state) => ({
          clienti: state.clienti.filter((cliente) => cliente.id !== id)
        }));
      },
      
      getClienteById: (id) => {
        return get().clienti.find((cliente) => cliente.id === id);
      }
    }),
    {
      name: "clienti-storage", // nome usato per salvare nel localStorage
    }
  )
);
