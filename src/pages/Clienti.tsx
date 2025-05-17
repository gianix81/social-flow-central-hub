
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
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
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Edit,
  Trash2,
  Building
} from "lucide-react";
import { useClienti, type Cliente, type NuovoCliente } from '@/hooks/useClienti';
import { useProgetti } from '@/hooks/useProgetti';

// Componente Form per l'inserimento o modifica di un cliente
const FormCliente = ({
  cliente,
  onSalva,
  onAnnulla
}: {
  cliente?: Cliente;
  onSalva: (cliente: NuovoCliente) => void;
  onAnnulla: () => void;
}) => {
  const [formData, setFormData] = useState<NuovoCliente>({
    nome: cliente?.nome || '',
    settore: cliente?.settore || '',
    referente: cliente?.referente || '',
    email: cliente?.email || '',
    telefono: cliente?.telefono || '',
    piva: cliente?.piva || '',
    indirizzo: cliente?.indirizzo || '',
    note: cliente?.note || '',
    contratto: cliente?.contratto || '',
    dataScadenzaContratto: cliente?.dataScadenzaContratto || '',
    attivo: cliente?.attivo !== undefined ? cliente.attivo : true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAttivo = () => {
    setFormData(prev => ({ ...prev, attivo: !prev.attivo }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalva(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh]">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome Azienda</Label>
        <Input 
          id="nome" 
          name="nome" 
          value={formData.nome} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="settore">Settore</Label>
          <Input 
            id="settore" 
            name="settore" 
            value={formData.settore || ''} 
            onChange={handleChange} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="piva">Partita IVA</Label>
          <Input 
            id="piva" 
            name="piva" 
            value={formData.piva || ''} 
            onChange={handleChange} 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="referente">Referente</Label>
        <Input 
          id="referente" 
          name="referente" 
          value={formData.referente || ''} 
          onChange={handleChange} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={formData.email || ''} 
            onChange={handleChange} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Telefono</Label>
          <Input 
            id="telefono" 
            name="telefono" 
            value={formData.telefono || ''} 
            onChange={handleChange} 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="indirizzo">Indirizzo</Label>
        <Input 
          id="indirizzo" 
          name="indirizzo" 
          value={formData.indirizzo || ''} 
          onChange={handleChange} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contratto">Riferimento Contratto</Label>
          <Input 
            id="contratto" 
            name="contratto" 
            value={formData.contratto || ''} 
            onChange={handleChange} 
            placeholder="Link o riferimento al contratto"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataScadenzaContratto">Data Scadenza Contratto</Label>
          <Input 
            id="dataScadenzaContratto" 
            name="dataScadenzaContratto" 
            type="date" 
            value={formData.dataScadenzaContratto || ''} 
            onChange={handleChange} 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="note">Note</Label>
        <Textarea 
          id="note" 
          name="note" 
          value={formData.note || ''} 
          onChange={handleChange} 
          placeholder="Inserisci eventuali note..." 
          rows={3}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="attivo"
          checked={formData.attivo}
          onChange={toggleAttivo}
          className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
        />
        <Label htmlFor="attivo" className="text-sm font-medium leading-none cursor-pointer">
          Cliente attivo
        </Label>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onAnnulla}>
          Annulla
        </Button>
        <Button type="submit">
          Salva
        </Button>
      </DialogFooter>
    </form>
  );
};

// Il componente principale per la pagina Clienti
const Clienti = () => {
  const { clienti, aggiungiCliente, modificaCliente, eliminaCliente } = useClienti();
  const { getProgettiByClienteId } = useProgetti();
  const [clienteSelezionato, setClienteSelezionato] = useState<Cliente | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [idDaEliminare, setIdDaEliminare] = useState<number | null>(null);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStato, setFiltroStato] = useState<'all' | 'active' | 'inactive'>('all');

  // Gestisce l'apertura del dialog per creare un nuovo cliente
  const handleNuovoCliente = () => {
    setClienteSelezionato(undefined);
    setIsDialogOpen(true);
  };

  // Gestisce l'apertura del dialog per modificare un cliente esistente
  const handleModificaCliente = (cliente: Cliente) => {
    setClienteSelezionato(cliente);
    setIsDialogOpen(true);
  };

  // Gestisce il salvataggio di un cliente (creazione o modifica)
  const handleSalvaCliente = (datiCliente: NuovoCliente) => {
    if (clienteSelezionato) {
      // Modifica di un cliente esistente
      modificaCliente(clienteSelezionato.id, datiCliente);
      toast({
        title: "Cliente aggiornato",
        description: `${datiCliente.nome} è stato aggiornato con successo.`,
      });
    } else {
      // Creazione di un nuovo cliente
      aggiungiCliente(datiCliente);
      toast({
        title: "Cliente aggiunto",
        description: `${datiCliente.nome} è stato aggiunto con successo.`,
      });
    }
    setIsDialogOpen(false);
  };

  // Gestisce l'eliminazione di un cliente
  const handleEliminaCliente = (id: number) => {
    // Verifica se ci sono progetti associati a questo cliente
    const progettiAssociati = getProgettiByClienteId(id);
    
    if (progettiAssociati.length > 0) {
      toast({
        title: "Impossibile eliminare il cliente",
        description: `Ci sono ${progettiAssociati.length} progetti associati a questo cliente. Elimina prima i progetti collegati.`,
        variant: "destructive"
      });
      return;
    }
    
    setIdDaEliminare(id);
    setIsDeleteDialogOpen(true);
  };

  // Conferma l'eliminazione di un cliente
  const confirmDelete = () => {
    if (idDaEliminare !== null) {
      const clienteDaEliminare = clienti.find(c => c.id === idDaEliminare);
      eliminaCliente(idDaEliminare);
      toast({
        title: "Cliente eliminato",
        description: clienteDaEliminare 
          ? `${clienteDaEliminare.nome} è stato rimosso con successo.`
          : "Cliente eliminato con successo.",
      });
      setIdDaEliminare(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // Filtra i clienti in base al termine di ricerca e al filtro di stato
  const clientiFiltrati = clienti.filter(cliente => {
    const matchesSearch = 
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cliente.settore && cliente.settore.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cliente.referente && cliente.referente.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cliente.email && cliente.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      filtroStato === 'all' ||
      (filtroStato === 'active' && cliente.attivo) ||
      (filtroStato === 'inactive' && !cliente.attivo);
    
    return matchesSearch && matchesFilter;
  });

  // Conta i progetti per cliente
  const contaProgetti = (clienteId: number) => {
    return getProgettiByClienteId(clienteId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestione Clienti</h1>
          <p className="text-gray-600">Gestisci i tuoi clienti e i loro progetti</p>
        </div>
        <Button onClick={handleNuovoCliente}>
          <Plus className="mr-2 h-4 w-4" />
          Aggiungi Cliente
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cerca clienti..."
            className="pl-9 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" />
            Filtro
          </Button>
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            value={filtroStato}
            onChange={(e) => setFiltroStato(e.target.value as any)}
          >
            <option value="all">Tutti i Clienti</option>
            <option value="active">Solo Attivi</option>
            <option value="inactive">Solo Inattivi</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientiFiltrati.map((cliente) => (
          <Card key={cliente.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
                  <span className="font-semibold text-brand">{cliente.nome.charAt(0)}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleModificaCliente(cliente)}>
                      <Edit className="h-4 w-4 mr-2" />
                      <span>Modifica</span>
                    </DropdownMenuItem>
                    <Link to={`/clienti/${cliente.id}`}>
                      <DropdownMenuItem>
                        <Building className="h-4 w-4 mr-2" />
                        <span>Visualizza Dettagli</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem 
                      className="text-red-600" 
                      onClick={() => handleEliminaCliente(cliente.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      <span>Elimina</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Link to={`/clienti/${cliente.id}`}>
                <h3 className="text-lg font-semibold mt-3">{cliente.nome}</h3>
                <p className="text-sm text-gray-500">{cliente.settore}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm">
                    <span className="font-medium">{contaProgetti(cliente.id)}</span>
                    <span className="text-gray-500 ml-1">Progetti</span>
                  </div>
                  <div className={`px-2 py-0.5 text-xs rounded-full ${cliente.attivo ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {cliente.attivo ? 'Attivo' : 'Inattivo'}
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
        
        <Card className="border-dashed cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center h-[164px]" onClick={handleNuovoCliente}>
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="h-5 w-5 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mt-3 text-gray-500">Aggiungi Nuovo Cliente</h3>
          </CardContent>
        </Card>
      </div>

      {/* Dialog per creare/modificare un cliente */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {clienteSelezionato ? "Modifica Cliente" : "Aggiungi Nuovo Cliente"}
            </DialogTitle>
            <DialogDescription>
              {clienteSelezionato 
                ? "Modifica le informazioni del cliente selezionato."
                : "Compila il form per aggiungere un nuovo cliente."}
            </DialogDescription>
          </DialogHeader>
          <FormCliente
            cliente={clienteSelezionato}
            onSalva={handleSalvaCliente}
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
              Sei sicuro di voler eliminare questo cliente? Questa azione non può essere annullata.
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

export default Clienti;
