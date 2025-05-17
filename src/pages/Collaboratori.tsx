
import React, { useState } from 'react';
import { useCollaboratori, Collaboratore } from '@/hooks/useCollaboratori';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import FormCollaboratore from '@/components/collaboratori/FormCollaboratore';
import { Edit, Plus, Search, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Collaboratori = () => {
  const { collaboratori, deleteCollaboratore } = useCollaboratori();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollaboratore, setSelectedCollaboratore] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [collaboratoreToDelete, setCollaboratoreToDelete] = useState<string | null>(null);
  
  const filteredCollaboratori = collaboratori.filter(collaboratore => 
    collaboratore.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    collaboratore.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaboratore.specializzazione.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaboratore.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (id: string) => {
    setSelectedCollaboratore(id);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setCollaboratoreToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (collaboratoreToDelete) {
      const collaboratore = collaboratori.find(c => c.id === collaboratoreToDelete);
      deleteCollaboratore(collaboratoreToDelete);
      setCollaboratoreToDelete(null);
      
      toast({
        title: 'Collaboratore eliminato',
        description: collaboratore ? `${collaboratore.nome} ${collaboratore.cognome} è stato rimosso con successo` : 'Collaboratore rimosso con successo',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collaboratori</h1>
          <p className="text-gray-600">Gestisci i collaboratori freelance per i tuoi progetti</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuovo Collaboratore
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedCollaboratore ? 'Modifica Collaboratore' : 'Nuovo Collaboratore'}
              </DialogTitle>
            </DialogHeader>
            <FormCollaboratore 
              collaboratoreId={selectedCollaboratore || undefined} 
              onSuccess={() => {
                setIsFormOpen(false);
                setSelectedCollaboratore(null);
              }} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cerca collaboratori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      <Card>
        <div className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Specializzazione</TableHead>
                <TableHead className="hidden md:table-cell">Telefono</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCollaboratori.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Nessun collaboratore trovato
                  </TableCell>
                </TableRow>
              ) : (
                filteredCollaboratori.map((collaboratore) => (
                  <TableRow key={collaboratore.id}>
                    <TableCell className="font-medium">
                      {collaboratore.nome} {collaboratore.cognome}
                    </TableCell>
                    <TableCell>{collaboratore.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{collaboratore.specializzazione}</TableCell>
                    <TableCell className="hidden md:table-cell">{collaboratore.telefono || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(collaboratore.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(collaboratore.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <AlertDialog open={!!collaboratoreToDelete} onOpenChange={(open) => !open && setCollaboratoreToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sei sicuro di voler eliminare questo collaboratore?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione non può essere annullata. Il collaboratore verrà rimosso permanentemente dal sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Elimina</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Collaboratori;
