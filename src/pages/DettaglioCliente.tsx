
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  Building,
  Edit,
  Mail,
  Phone,
  Plus,
  Trash2,
  FileText,
  CalendarClock
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useClienti } from '@/hooks/useClienti';
import { useProgetti } from '@/hooks/useProgetti';
import { FormCliente } from '@/components/clienti/FormCliente';

const DettaglioCliente = () => {
  const { id } = useParams();
  const clienteId = parseInt(id || "0");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { clienti, modificaCliente, eliminaCliente, getClienteById } = useClienti();
  const { progetti, getProgettiByClienteId } = useProgetti();
  
  const cliente = getClienteById(clienteId);
  const progettiCliente = getProgettiByClienteId(clienteId);

  const [isModificaDialogOpen, setIsModificaDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Reindirizza alla lista clienti se il cliente non esiste
  if (!cliente) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Cliente non trovato</h1>
        <p className="text-gray-600 mt-2">Il cliente richiesto non esiste.</p>
        <Button asChild className="mt-4">
          <Link to="/clienti">Torna alla lista clienti</Link>
        </Button>
      </div>
    );
  }

  // Gestisce il salvataggio delle modifiche al cliente
  const handleSalvaModifiche = (datiCliente: Omit<typeof cliente, 'id'>) => {
    modificaCliente(clienteId, datiCliente);
    toast({
      title: "Cliente aggiornato",
      description: `${datiCliente.nome} è stato aggiornato con successo.`,
    });
    setIsModificaDialogOpen(false);
  };

  // Gestisce l'eliminazione del cliente
  const handleEliminaCliente = () => {
    // Verifica se ci sono progetti associati a questo cliente
    if (progettiCliente.length > 0) {
      toast({
        title: "Impossibile eliminare il cliente",
        description: `Ci sono ${progettiCliente.length} progetti associati a questo cliente. Elimina prima i progetti collegati.`,
        variant: "destructive"
      });
      return;
    }
    
    setIsDeleteDialogOpen(true);
  };

  // Conferma l'eliminazione del cliente
  const confirmDelete = () => {
    eliminaCliente(clienteId);
    toast({
      title: "Cliente eliminato",
      description: `${cliente.nome} è stato rimosso con successo.`,
    });
    navigate('/clienti');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/clienti">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{cliente.nome}</h1>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs rounded-full ${cliente.attivo ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {cliente.attivo ? 'Attivo' : 'Inattivo'}
              </span>
              {cliente.settore && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{cliente.settore}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={() => setIsModificaDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Modifica Cliente
          </Button>
          <Button variant="destructive" onClick={handleEliminaCliente}>
            <Trash2 className="mr-2 h-4 w-4" />
            Elimina Cliente
          </Button>
        </div>
      </div>

      <Tabs defaultValue="panoramica" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 h-auto">
          <TabsTrigger value="panoramica" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">
            Panoramica
          </TabsTrigger>
          <TabsTrigger value="progetti" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">
            Progetti
          </TabsTrigger>
          <TabsTrigger value="contenuti" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">
            Contenuti
          </TabsTrigger>
          <TabsTrigger value="documenti" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">
            Documenti
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="panoramica" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informazioni Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cliente.note && <p>{cliente.note}</p>}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-4">
                      {cliente.referente && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Referente</h4>
                          <p className="mt-1">{cliente.referente}</p>
                        </div>
                      )}
                      
                      {cliente.email && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Email</h4>
                          <p className="mt-1 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <a href={`mailto:${cliente.email}`} className="text-brand hover:underline">
                              {cliente.email}
                            </a>
                          </p>
                        </div>
                      )}
                      
                      {cliente.telefono && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Telefono</h4>
                          <p className="mt-1 flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{cliente.telefono}</span>
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {cliente.piva && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Partita IVA</h4>
                          <p className="mt-1">{cliente.piva}</p>
                        </div>
                      )}
                      
                      {cliente.indirizzo && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Indirizzo</h4>
                          <p className="mt-1">{cliente.indirizzo}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {cliente.contratto && (
                    <div className="p-4 mt-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Contratto</h4>
                      <div className="flex items-center justify-between mt-2">
                        <a href={cliente.contratto} target="_blank" rel="noopener noreferrer" className="text-sm text-brand hover:underline flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>Visualizza contratto</span>
                        </a>
                        {cliente.dataScadenzaContratto && (
                          <div className="flex items-center gap-2">
                            <CalendarClock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Scadenza: {cliente.dataScadenzaContratto}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progetti Attivi</CardTitle>
                  <CardDescription>
                    {progettiCliente.filter(p => p.stato === 'Attivo' || p.stato === 'In Corso').length} progetti attivi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {progettiCliente.filter(p => p.stato === 'Attivo' || p.stato === 'In Corso').length > 0 ? (
                    progettiCliente
                      .filter(p => p.stato === 'Attivo' || p.stato === 'In Corso')
                      .slice(0, 3)
                      .map(progetto => (
                        <div key={progetto.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                          <Link to={`/progetti/${progetto.id}`} className="font-medium hover:text-brand">
                            {progetto.nome}
                          </Link>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              progetto.stato === 'Attivo' || progetto.stato === 'In Corso' 
                                ? 'bg-green-50 text-green-700' 
                                : progetto.stato === 'Pianificazione' 
                                ? 'bg-blue-50 text-blue-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {progetto.stato}
                            </span>
                            {progetto.dataScadenza && (
                              <span className="text-xs text-gray-500">
                                Scadenza: {progetto.dataScadenza}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-center text-gray-500 py-3">Nessun progetto attivo</p>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex w-full gap-3">
                    <Button variant="outline" asChild className="flex-1">
                      <Link to={`/progetti?cliente=${clienteId}`}>
                        Tutti i Progetti
                      </Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link to={`/progetti/nuovo?cliente=${clienteId}`}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuovo Progetto
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiche</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Progetti Totali</span>
                        <span className="font-medium">{progettiCliente.length}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span>Progetti Attivi</span>
                        <span className="font-medium">
                          {progettiCliente.filter(p => p.stato === 'Attivo' || p.stato === 'In Corso').length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span>Progetti Completati</span>
                        <span className="font-medium">
                          {progettiCliente.filter(p => p.stato === 'Completato').length}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="progetti">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Progetti di {cliente.nome}</h2>
            {progettiCliente.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {progettiCliente.map(progetto => (
                  <Card key={progetto.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className={`px-2 py-1 text-xs rounded-full ${
                          progetto.stato === 'Attivo' || progetto.stato === 'In Corso' 
                            ? 'bg-green-50 text-green-700' 
                            : progetto.stato === 'Pianificazione' 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {progetto.stato}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mt-3">{progetto.nome}</h3>
                      
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
                      
                      <div className="mt-4">
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link to={`/progetti/${progetto.id}`}>
                            Visualizza Progetto
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-dashed flex flex-col items-center justify-center h-[180px]">
                  <CardContent className="flex flex-col items-center justify-center text-center p-6">
                    <Button asChild variant="outline">
                      <Link to={`/progetti/nuovo?cliente=${clienteId}`}>
                        <Plus className="h-5 w-5 mr-2" />
                        Nuovo Progetto
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center p-10">
                <Building className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">Nessun progetto trovato</h3>
                <p className="mt-1 text-gray-500">
                  Questo cliente non ha ancora progetti assegnati.
                </p>
                <Button asChild className="mt-4">
                  <Link to={`/progetti/nuovo?cliente=${clienteId}`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crea Primo Progetto
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="contenuti">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Contenuti del Cliente</h3>
            <p className="text-gray-500 mt-2">I contenuti pianificati e pubblicati per questo cliente saranno visualizzati qui.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="documenti">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Documenti</h3>
            <p className="text-gray-500 mt-2">I documenti relativi a questo cliente saranno visualizzati qui.</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog per modificare il cliente */}
      <Dialog open={isModificaDialogOpen} onOpenChange={setIsModificaDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Modifica Cliente</DialogTitle>
            <DialogDescription>
              Modifica le informazioni del cliente selezionato.
            </DialogDescription>
          </DialogHeader>
          <FormCliente
            cliente={cliente}
            onSalva={handleSalvaModifiche}
            onAnnulla={() => setIsModificaDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog di conferma per l'eliminazione */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conferma eliminazione</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare {cliente.nome}? Questa azione non può essere annullata.
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

export default DettaglioCliente;
