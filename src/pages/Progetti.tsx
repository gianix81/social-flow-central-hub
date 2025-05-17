
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Calendar,
  Clock,
  Filter,
  Grid3X3,
  ListFilter,
  Plus,
  Search,
  Trash2,
  Edit
} from "lucide-react";
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
import { useProgetti, type Progetto } from '@/hooks/useProgetti';
import { useClienti } from '@/hooks/useClienti';
import { useOperatori } from '@/hooks/useOperatori';
import { FormProgetto, type FormProgettoData } from '@/components/progetti/FormProgetto';

// Funzione utility per estrarre i parametri di query dalla URL
const useQueryParams = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const Progetti = () => {
  const queryParams = useQueryParams();
  const clienteIdFromQuery = queryParams.get('cliente') ? parseInt(queryParams.get('cliente')!) : undefined;
  
  const { progetti, aggiungiProgetto, modificaProgetto, eliminaProgetto } = useProgetti();
  const { clienti, getClienteById } = useClienti();
  const { operatori, getOperatoreById } = useOperatori();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [modalitaVisualizzazione, setModalitaVisualizzazione] = useState<'griglia' | 'lista'>('griglia');
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStato, setFiltroStato] = useState<string>('all');
  const [filtroCliente, setFiltroCliente] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [progettoSelezionato, setProgettoSelezionato] = useState<Progetto | undefined>(undefined);
  const [progettoIdDaEliminare, setProgettoIdDaEliminare] = useState<number | null>(null);

  // Apri dialogo per nuovo progetto, possibilmente con cliente preselezionato
  const handleNuovoProgetto = () => {
    setProgettoSelezionato(undefined);
    setIsDialogOpen(true);
  };

  // Apri dialogo per modificare un progetto esistente
  const handleModificaProgetto = (progetto: Progetto) => {
    setProgettoSelezionato(progetto);
    setIsDialogOpen(true);
  };

  // Gestisce il salvataggio di un progetto (creazione o modifica)
  const handleSalvaProgetto = (datiProgetto: FormProgettoData) => {
    if (progettoSelezionato) {
      // Modifica di un progetto esistente
      modificaProgetto(progettoSelezionato.id, datiProgetto);
      toast({
        title: "Progetto aggiornato",
        description: `${datiProgetto.nome} è stato aggiornato con successo.`,
      });
    } else {
      // Creazione di un nuovo progetto
      aggiungiProgetto(datiProgetto);
      toast({
        title: "Progetto creato",
        description: `${datiProgetto.nome} è stato creato con successo.`,
      });
    }
    setIsDialogOpen(false);

    // Se venivamo dalla pagina di un cliente, torniamo a quella pagina
    if (clienteIdFromQuery) {
      navigate(`/clienti/${clienteIdFromQuery}`);
    }
  };

  // Chiedi conferma per eliminare un progetto
  const handleEliminaProgetto = (id: number) => {
    setProgettoIdDaEliminare(id);
    setIsDeleteDialogOpen(true);
  };

  // Conferma ed esegue l'eliminazione
  const confirmDelete = () => {
    if (progettoIdDaEliminare === null) return;
    
    const progettoToDelete = progetti.find(p => p.id === progettoIdDaEliminare);
    eliminaProgetto(progettoIdDaEliminare);
    
    toast({
      title: "Progetto eliminato",
      description: progettoToDelete 
        ? `${progettoToDelete.nome} è stato eliminato con successo.`
        : "Il progetto è stato eliminato con successo.",
    });
    
    setProgettoIdDaEliminare(null);
    setIsDeleteDialogOpen(false);
  };

  // Funzione per ottenere il nome di un cliente dato il suo ID
  const getNomeCliente = (clienteId: number): string => {
    const cliente = getClienteById(clienteId);
    return cliente ? cliente.nome : "Cliente sconosciuto";
  };

  // Funzione per ottenere le iniziali di un operatore
  const getInizialiOperatore = (operatoreId: number): string => {
    const operatore = getOperatoreById(operatoreId);
    if (!operatore) return "??";
    return `${operatore.nome.charAt(0)}${operatore.cognome.charAt(0)}`;
  };

  // Filtra i progetti in base ai criteri di ricerca
  const progettiFiltrati = progetti.filter(progetto => {
    const matchesSearch = 
      progetto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getNomeCliente(progetto.clienteId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatoFilter = 
      filtroStato === 'all' || 
      progetto.stato === filtroStato;
    
    const matchesClienteFilter = 
      filtroCliente === 'all' || 
      progetto.clienteId.toString() === filtroCliente;
    
    return matchesSearch && matchesStatoFilter && matchesClienteFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progetti</h1>
          <p className="text-gray-600">Gestisci e tieni traccia di tutti i tuoi progetti cliente</p>
        </div>
        <Button onClick={handleNuovoProgetto}>
          <Plus className="mr-2 h-4 w-4" />
          Crea Progetto
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cerca progetti..."
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
            onChange={(e) => setFiltroStato(e.target.value)}
          >
            <option value="all">Tutti i Progetti</option>
            <option value="Attivo">Solo Attivi</option>
            <option value="In Corso">In Corso</option>
            <option value="Pianificazione">In Pianificazione</option>
            <option value="Completato">Completati</option>
            <option value="In Pausa">In Pausa</option>
            <option value="Cancellato">Cancellati</option>
          </select>
          
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            value={filtroCliente}
            onChange={(e) => setFiltroCliente(e.target.value)}
          >
            <option value="all">Tutti i Clienti</option>
            {clienti.map(cliente => (
              <option key={cliente.id} value={cliente.id.toString()}>
                {cliente.nome}
              </option>
            ))}
          </select>
          
          <div className="flex bg-muted rounded-md p-1">
            <Button
              variant={modalitaVisualizzazione === 'griglia' ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setModalitaVisualizzazione('griglia')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={modalitaVisualizzazione === 'lista' ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setModalitaVisualizzazione('lista')}
            >
              <ListFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {modalitaVisualizzazione === 'griglia' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {progettiFiltrati.map((progetto) => (
            <Card key={progetto.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between">
                  <div className={`px-2 py-1 text-xs rounded-full ${
                    progetto.stato === 'Attivo' || progetto.stato === 'In Corso' 
                      ? 'bg-green-50 text-green-700' 
                      : progetto.stato === 'Pianificazione' 
                      ? 'bg-blue-50 text-blue-700' 
                      : progetto.stato === 'Completato'
                      ? 'bg-purple-50 text-purple-700'
                      : progetto.stato === 'In Pausa'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {progetto.stato}
                  </div>
                  <Link 
                    to={`/clienti/${progetto.clienteId}`} 
                    className="text-xs bg-brand-50 text-brand-800 px-2 py-1 rounded-full hover:bg-brand-100" 
                    onClick={e => e.stopPropagation()}
                  >
                    {getNomeCliente(progetto.clienteId)}
                  </Link>
                </div>
                
                <div className="flex justify-between items-start mt-3">
                  <Link to={`/progetti/${progetto.id}`}>
                    <h3 className="text-lg font-semibold hover:text-brand">{progetto.nome}</h3>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleModificaProgetto(progetto)}>
                        <Edit className="h-4 w-4 mr-2" />
                        <span>Modifica</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600" 
                        onClick={() => handleEliminaProgetto(progetto.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        <span>Elimina</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {progetto.attivitaCompletate !== undefined && progetto.totaleAttivita !== undefined && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full">
                      <div 
                        className="bg-brand h-1.5 rounded-full" 
                        style={{ width: `${(progetto.attivitaCompletate / progetto.totaleAttivita) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>{progetto.attivitaCompletate} di {progetto.totaleAttivita} attività</span>
                      <span>{Math.round((progetto.attivitaCompletate / progetto.totaleAttivita) * 100)}% completato</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">{progetto.dataScadenza || 'Continuo'}</span>
                  </div>
                  <div className="flex">
                    {progetto.operatoriIds.slice(0, 3).map((operatoreId, i) => (
                      <div 
                        key={operatoreId}
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium -ml-1 first:ml-0 ring-2 ring-white"
                        title={getOperatoreById(operatoreId)?.nome + ' ' + getOperatoreById(operatoreId)?.cognome}
                      >
                        {getInizialiOperatore(operatoreId)}
                      </div>
                    ))}
                    {progetto.operatoriIds.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium -ml-1 ring-2 ring-white">
                        +{progetto.operatoriIds.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          <Card className="border-dashed cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center h-[195px]" onClick={handleNuovoProgetto}>
            <div className="flex flex-col items-center justify-center text-center p-6">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Plus className="h-5 w-5 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium mt-3 text-gray-500">Crea Nuovo Progetto</h3>
            </div>
          </Card>
        </div>
      ) : (
        <Card>
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500">
                  <th className="font-medium px-2 py-2">Progetto</th>
                  <th className="font-medium px-2 py-2">Cliente</th>
                  <th className="font-medium px-2 py-2">Stato</th>
                  <th className="font-medium px-2 py-2">Scadenza</th>
                  <th className="font-medium px-2 py-2">Avanzamento</th>
                  <th className="font-medium px-2 py-2">Team</th>
                  <th className="font-medium px-2 py-2">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {progettiFiltrati.map((progetto) => (
                  <tr 
                    key={progetto.id} 
                    className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/progetti/${progetto.id}`)}
                  >
                    <td className="px-2 py-3 font-medium">{progetto.nome}</td>
                    <td className="px-2 py-3">
                      <Link 
                        to={`/clienti/${progetto.clienteId}`} 
                        className="text-xs bg-brand-50 text-brand-800 px-2 py-1 rounded-full hover:bg-brand-100"
                        onClick={e => e.stopPropagation()}
                      >
                        {getNomeCliente(progetto.clienteId)}
                      </Link>
                    </td>
                    <td className="px-2 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        progetto.stato === 'Attivo' || progetto.stato === 'In Corso' 
                          ? 'bg-green-50 text-green-700' 
                          : progetto.stato === 'Pianificazione' 
                          ? 'bg-blue-50 text-blue-700' 
                          : progetto.stato === 'Completato'
                          ? 'bg-purple-50 text-purple-700'
                          : progetto.stato === 'In Pausa'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {progetto.stato}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-sm">{progetto.dataScadenza || 'Continuo'}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      {progetto.attivitaCompletate !== undefined && progetto.totaleAttivita !== undefined ? (
                        <>
                          <div className="w-full max-w-[100px] bg-gray-100 h-1.5 rounded-full">
                            <div 
                              className="bg-brand h-1.5 rounded-full" 
                              style={{ width: `${(progetto.attivitaCompletate / progetto.totaleAttivita) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {Math.round((progetto.attivitaCompletate / progetto.totaleAttivita) * 100)}%
                          </div>
                        </>
                      ) : (
                        <span className="text-xs text-gray-500">Non disponibile</span>
                      )}
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex">
                        {progetto.operatoriIds.slice(0, 3).map((operatoreId) => (
                          <div 
                            key={operatoreId}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium -ml-1 first:ml-0 ring-2 ring-white"
                            title={getOperatoreById(operatoreId)?.nome + ' ' + getOperatoreById(operatoreId)?.cognome}
                          >
                            {getInizialiOperatore(operatoreId)}
                          </div>
                        ))}
                        {progetto.operatoriIds.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium -ml-1 ring-2 ring-white">
                            +{progetto.operatoriIds.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleModificaProgetto(progetto);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-red-600 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEliminaProgetto(progetto.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Dialog per creare/modificare un progetto */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {progettoSelezionato ? "Modifica Progetto" : "Crea Nuovo Progetto"}
            </DialogTitle>
            <DialogDescription>
              {progettoSelezionato 
                ? "Modifica le informazioni del progetto selezionato."
                : "Compila il form per aggiungere un nuovo progetto."}
            </DialogDescription>
          </DialogHeader>
          <FormProgetto
            progetto={progettoSelezionato}
            clienteIdPreselezionato={clienteIdFromQuery}
            onSalva={handleSalvaProgetto}
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
              Sei sicuro di voler eliminare questo progetto? Questa azione non può essere annullata.
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

export default Progetti;
