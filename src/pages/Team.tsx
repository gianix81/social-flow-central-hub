
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Edit, 
  MoreHorizontal, 
  Search, 
  Trash2, 
  UserPlus 
} from "lucide-react";
import { useOperatori, type Operatore } from '@/hooks/useOperatori';
import { FormOperatore, type FormOperatoreData } from '@/components/team/FormOperatore';
import { useProgetti } from '@/hooks/useProgetti';

// Componente per la scheda dell'operatore
const SchemaOperatore = ({ 
  operatore, 
  onModifica, 
  onElimina 
}: {
  operatore: Operatore;
  onModifica: (operatore: Operatore) => void;
  onElimina: (id: number) => void;
}) => {
  // Crea le iniziali dell'operatore come avatar improvvisato
  const iniziali = `${operatore.nome.charAt(0)}${operatore.cognome.charAt(0)}`;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6 px-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center">
              <span className="text-brand font-medium text-lg">{iniziali}</span>
            </div>
            <div>
              <h3 className="font-semibold">{operatore.nome} {operatore.cognome}</h3>
              <p className="text-sm text-gray-600">{operatore.ruolo}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onModifica(operatore)}>
                <Edit className="h-4 w-4 mr-2" />
                <span>Modifica</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600" 
                onClick={() => onElimina(operatore.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Elimina</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">{operatore.email}</p>
          {operatore.note && <p className="text-sm text-gray-500 mt-2">{operatore.note}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

// Il componente principale per la pagina Team
const Team = () => {
  const { operatori, aggiungiOperatore, modificaOperatore, eliminaOperatore } = useOperatori();
  const { getProgettiByOperatoreId } = useProgetti();
  const [operatoreSelezionato, setOperatoreSelezionato] = useState<Operatore | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [idDaEliminare, setIdDaEliminare] = useState<number | null>(null);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Gestisce l'apertura del dialog per creare un nuovo operatore
  const handleNuovoOperatore = () => {
    setOperatoreSelezionato(undefined);
    setIsDialogOpen(true);
  };

  // Gestisce l'apertura del dialog per modificare un operatore esistente
  const handleModificaOperatore = (operatore: Operatore) => {
    setOperatoreSelezionato(operatore);
    setIsDialogOpen(true);
  };

  // Gestisce il salvataggio di un operatore (creazione o modifica)
  const handleSalvaOperatore = (datiOperatore: FormOperatoreData) => {
    if (operatoreSelezionato) {
      // Modifica di un operatore esistente
      modificaOperatore(operatoreSelezionato.id, datiOperatore);
      toast({
        title: "Operatore aggiornato",
        description: `${datiOperatore.nome} ${datiOperatore.cognome} è stato aggiornato con successo.`,
      });
    } else {
      // Creazione di un nuovo operatore
      aggiungiOperatore(datiOperatore);
      toast({
        title: "Operatore aggiunto",
        description: `${datiOperatore.nome} ${datiOperatore.cognome} è stato aggiunto al team.`,
      });
    }
    setIsDialogOpen(false);
  };

  // Gestisce l'eliminazione di un operatore
  const handleEliminaOperatore = (id: number) => {
    // Verifica se l'operatore è associato a progetti
    const progettiAssociati = getProgettiByOperatoreId(id);
    
    if (progettiAssociati.length > 0) {
      toast({
        title: "Impossibile eliminare l'operatore",
        description: `Questo operatore è associato a ${progettiAssociati.length} progetti. Rimuovilo prima dai progetti.`,
        variant: "destructive"
      });
      return;
    }
    
    setIdDaEliminare(id);
    setIsDeleteDialogOpen(true);
  };

  // Conferma l'eliminazione di un operatore
  const confirmDelete = () => {
    if (idDaEliminare !== null) {
      const operatoreDaEliminare = operatori.find(op => op.id === idDaEliminare);
      eliminaOperatore(idDaEliminare);
      toast({
        title: "Operatore eliminato",
        description: operatoreDaEliminare 
          ? `${operatoreDaEliminare.nome} ${operatoreDaEliminare.cognome} è stato rimosso dal team.`
          : "Operatore eliminato con successo.",
      });
      setIdDaEliminare(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // Filtra gli operatori in base al termine di ricerca
  const operatoriFiltrati = operatori.filter(op => 
    op.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.ruolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestione Team</h1>
          <p className="text-gray-600">Gestisci gli operatori del tuo team e assegnali ai progetti</p>
        </div>
        <Button onClick={handleNuovoOperatore}>
          <UserPlus className="mr-2 h-4 w-4" />
          Aggiungi Operatore
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cerca operatori..."
            className="pl-9 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operatoriFiltrati.map((operatore) => (
          <SchemaOperatore
            key={operatore.id}
            operatore={operatore}
            onModifica={handleModificaOperatore}
            onElimina={handleEliminaOperatore}
          />
        ))}
        
        <Card className="border-dashed cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center h-[156px]" onClick={handleNuovoOperatore}>
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mt-3 text-gray-500">Aggiungi Operatore</h3>
          </CardContent>
        </Card>
      </div>

      {/* Dialog per creare/modificare un operatore */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {operatoreSelezionato ? "Modifica Operatore" : "Aggiungi Nuovo Operatore"}
            </DialogTitle>
            <DialogDescription>
              {operatoreSelezionato 
                ? "Modifica le informazioni dell'operatore selezionato."
                : "Compila il form per aggiungere un nuovo operatore al team."}
            </DialogDescription>
          </DialogHeader>
          <FormOperatore
            operatore={operatoreSelezionato}
            onSalva={handleSalvaOperatore}
            onAnnulla={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog di conferma per l'eliminazione */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conferma eliminazione</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare questo operatore? Questa azione non può essere annullata.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annulla
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Elimina
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Team;
