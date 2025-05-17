
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { type Operatore, ruoliOperatore } from '@/hooks/useOperatori';

// Tipo per i dati del form operatore (senza id)
export type FormOperatoreData = Omit<Operatore, 'id'>;

// Componente Form per l'inserimento o modifica di un operatore
export const FormOperatore = ({
  operatore,
  onSalva,
  onAnnulla
}: {
  operatore?: Operatore;
  onSalva: (operatore: FormOperatoreData) => void;
  onAnnulla: () => void;
}) => {
  const [formData, setFormData] = useState<FormOperatoreData>({
    nome: operatore?.nome || '',
    cognome: operatore?.cognome || '',
    email: operatore?.email || '',
    ruolo: operatore?.ruolo || '',
    note: operatore?.note || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRuoloChange = (value: string) => {
    setFormData(prev => ({ ...prev, ruolo: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalva(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome</Label>
          <Input 
            id="nome" 
            name="nome" 
            value={formData.nome} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cognome">Cognome</Label>
          <Input 
            id="cognome" 
            name="cognome" 
            value={formData.cognome} 
            onChange={handleChange} 
            required 
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ruolo">Ruolo</Label>
        <Select 
          value={formData.ruolo} 
          onValueChange={handleRuoloChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleziona un ruolo" />
          </SelectTrigger>
          <SelectContent>
            {ruoliOperatore.map(ruolo => (
              <SelectItem key={ruolo} value={ruolo}>{ruolo}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="note">Note (opzionale)</Label>
        <Textarea 
          id="note" 
          name="note" 
          value={formData.note || ''} 
          onChange={handleChange} 
          placeholder="Inserisci eventuali note o dettagli aggiuntivi..." 
          rows={3}
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onAnnulla}>Annulla</Button>
        <Button type="submit">Salva</Button>
      </DialogFooter>
    </form>
  );
};
