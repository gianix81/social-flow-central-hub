
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Collaboratore = {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  specializzazione: string;
  telefono?: string;
  note?: string;
  attivo: boolean;
};

type CollaboratoriStore = {
  collaboratori: Collaboratore[];
  addCollaboratore: (collaboratore: Omit<Collaboratore, 'id'>) => string;
  updateCollaboratore: (collaboratore: Collaboratore) => void;
  deleteCollaboratore: (id: string) => void;
  getCollaboratoreById: (id: string) => Collaboratore | undefined;
};

export const useCollaboratori = create<CollaboratoriStore>()(
  persist(
    (set, get) => ({
      collaboratori: [
        {
          id: '1',
          nome: 'Marco',
          cognome: 'Bianchi',
          email: 'marco.bianchi@example.com',
          specializzazione: 'Graphic Designer',
          telefono: '+39 345 678 9012',
          attivo: true,
        },
        {
          id: '2',
          nome: 'Laura',
          cognome: 'Rossi',
          email: 'laura.rossi@example.com',
          specializzazione: 'Content Writer',
          telefono: '+39 345 123 4567',
          attivo: true,
        },
        {
          id: '3',
          nome: 'Giovanni',
          cognome: 'Verdi',
          email: 'giovanni.verdi@example.com',
          specializzazione: 'Video Editor',
          attivo: true,
        },
      ],
      addCollaboratore: (collaboratore) => {
        const id = Date.now().toString();
        set((state) => ({
          collaboratori: [
            ...state.collaboratori,
            {
              ...collaboratore,
              id,
            },
          ],
        }));
        return id;
      },
      updateCollaboratore: (collaboratore) => {
        set((state) => ({
          collaboratori: state.collaboratori.map((c) =>
            c.id === collaboratore.id ? collaboratore : c
          ),
        }));
      },
      deleteCollaboratore: (id) => {
        set((state) => ({
          collaboratori: state.collaboratori.filter((c) => c.id !== id),
        }));
      },
      getCollaboratoreById: (id) => {
        return get().collaboratori.find((c) => c.id === id);
      },
    }),
    {
      name: 'collaboratori-storage',
    }
  )
);
