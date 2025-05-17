
import { useState, useEffect } from 'react';
import { Collaboratore, useCollaboratori } from '@/hooks/useCollaboratori';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FormCollaboratoreProps {
  collaboratoreId?: string;
  onSuccess?: () => void;
}

const FormCollaboratore = ({ collaboratoreId, onSuccess }: FormCollaboratoreProps) => {
  const { collaboratori, addCollaboratore, updateCollaboratore, getCollaboratoreById } = useCollaboratori();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<Collaboratore, 'id'>>({
    nome: '',
    cognome: '',
    email: '',
    specializzazione: '',
    telefono: '',
    note: '',
    attivo: true,
  });

  useEffect(() => {
    if (collaboratoreId) {
      const collaboratore = getCollaboratoreById(collaboratoreId);
      if (collaboratore) {
        setFormData({
          nome: collaboratore.nome,
          cognome: collaboratore.cognome,
          email: collaboratore.email,
          specializzazione: collaboratore.specializzazione,
          telefono: collaboratore.telefono || '',
          note: collaboratore.note || '',
          attivo: collaboratore.attivo,
        });
      }
    }
  }, [collaboratoreId, getCollaboratoreById]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.cognome || !formData.email || !formData.specializzazione) {
      toast({
        title: 'Errore',
        description: 'Compila tutti i campi obbligatori',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (collaboratoreId) {
        // Aggiornamento di un collaboratore esistente
        updateCollaboratore({
          id: collaboratoreId,
          ...formData,
        });
        toast({
          title: 'Collaboratore aggiornato',
          description: `${formData.nome} ${formData.cognome} è stato aggiornato con successo`,
        });
      } else {
        // Creazione di un nuovo collaboratore
        addCollaboratore(formData);
        toast({
          title: 'Collaboratore creato',
          description: `${formData.nome} ${formData.cognome} è stato aggiunto con successo`,
        });
        // Reset form per nuovi inserimenti
        setFormData({
          nome: '',
          cognome: '',
          email: '',
          specializzazione: '',
          telefono: '',
          note: '',
          attivo: true,
        });
      }
      
      // Callback di successo
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Si è verificato un errore durante il salvataggio del collaboratore',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{collaboratoreId ? 'Modifica collaboratore' : 'Nuovo collaboratore'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome"
                required
              />
            </div>
            <div>
              <Label htmlFor="cognome">Cognome *</Label>
              <Input
                id="cognome"
                name="cognome"
                value={formData.cognome}
                onChange={handleChange}
                placeholder="Cognome"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@esempio.com"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="specializzazione">Specializzazione *</Label>
            <Input
              id="specializzazione"
              name="specializzazione"
              value={formData.specializzazione}
              onChange={handleChange}
              placeholder="Es. Graphic Designer, Content Writer"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="telefono">Telefono</Label>
            <Input
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+39 123 456 7890"
            />
          </div>
          
          <div>
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              name="note"
              value={formData.note || ''}
              onChange={handleChange}
              placeholder="Inserisci eventuali note"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="submit" className="mt-4">
              {collaboratoreId ? 'Aggiorna' : 'Salva'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormCollaboratore;
