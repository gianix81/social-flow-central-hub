
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
import { type Progetto, statiProgetto } from '@/hooks/useProgetti';
import { useClienti } from '@/hooks/useClienti';
import { useOperatori, type Operatore } from '@/hooks/useOperatori';

// Tipo per i dati del form progetto (senza id)
export type FormProgettoData = Omit<Progetto, 'id'>;

// Componente Form per l'inserimento o modifica di un progetto
export const FormProgetto = ({
  progetto,
  clienteIdPreselezionato,
  onSalva,
  onAnnulla
}: {
  progetto?: Progetto;
  clienteIdPreselezionato?: number;
  onSalva: (progetto: FormProgettoData) => void;
  onAnnulla: () => void;
}) => {
  const { clienti } = useClienti();
  const { operatori } = useOperatori();
  
  const [formData, setFormData] = useState<FormProgettoData>({
    nome: progetto?.nome || '',
    clienteId: progetto?.clienteId || clienteIdPreselezionato || 0,
    obiettivi: progetto?.obiettivi || '',
    budget: progetto?.budget || '',
    dataInizio: progetto?.dataInizio || '',
    dataScadenza: progetto?.dataScadenza || '',
    stato: progetto?.stato || 'Pianificazione',
    operatoriIds: progetto?.operatoriIds || [],
    attivitaCompletate: progetto?.attivitaCompletate || 0,
    totaleAttivita: progetto?.totaleAttivita || 0
  });

  const [operatoriSelezionati, setOperatoriSelezionati] = useState<Record<number, boolean>>(
    progetto?.operatoriIds.reduce((obj, id) => ({ ...obj, [id]: true }), {}) || {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    const valToStore = name === 'clienteId' ? parseInt(value) : value;
    setFormData(prev => ({ ...prev, [name]: valToStore }));
  };

  const toggleOperatore = (id: number) => {
    setOperatoriSelezionati(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      // Aggiorna anche formData.operatoriIds basandosi sui nuovi operatori selezionati
      const operatoriIds = Object.entries(newState)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => parseInt(id));
      
      setFormData(prevForm => ({ ...prevForm, operatoriIds }));
      return newState;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalva(formData);
  };

  // Raggruppa gli operatori per ruolo per una migliore UI
  const operatoriPerRuolo: Record<string, Operatore[]> = {};
  operatori.forEach(op => {
    if (!operatoriPerRuolo[op.ruolo]) {
      operatoriPerRuolo[op.ruolo] = [];
    }
    operatoriPerRuolo[op.ruolo].push(op);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome Progetto</Label>
        <Input 
          id="nome" 
          name="nome" 
          value={formData.nome} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="clienteId">Cliente</Label>
        <Select 
          value={formData.clienteId.toString()} 
          onValueChange={(value) => handleSelectChange('clienteId', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleziona un cliente" />
          </SelectTrigger>
          <SelectContent>
            {clienti.map(cliente => (
              <SelectItem key={cliente.id} value={cliente.id.toString()}>
                {cliente.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="stato">Stato</Label>
        <Select 
          value={formData.stato} 
          onValueChange={(value) => handleSelectChange('stato', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleziona uno stato" />
          </SelectTrigger>
          <SelectContent>
            {statiProgetto.map(stato => (
              <SelectItem key={stato} value={stato}>
                {stato}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dataInizio">Data Inizio</Label>
          <Input 
            id="dataInizio" 
            name="dataInizio" 
            type="date" 
            value={formData.dataInizio || ''} 
            onChange={handleChange} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataScadenza">Scadenza</Label>
          <Input 
            id="dataScadenza" 
            name="dataScadenza" 
            type="date" 
            value={formData.dataScadenza || ''} 
            onChange={handleChange} 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="obiettivi">Obiettivi</Label>
        <Textarea 
          id="obiettivi" 
          name="obiettivi" 
          value={formData.obiettivi || ''} 
          onChange={handleChange} 
          placeholder="Descrivi gli obiettivi del progetto..." 
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="budget">Budget (opzionale)</Label>
        <Input 
          id="budget" 
          name="budget" 
          value={formData.budget || ''} 
          onChange={handleChange} 
          placeholder="Es. 1.500€" 
        />
      </div>
      
      <div className="space-y-2">
        <Label>Team del Progetto</Label>
        <div className="border rounded-md p-4 space-y-4 max-h-[200px] overflow-y-auto">
          {Object.entries(operatoriPerRuolo).map(([ruolo, ops]) => (
            <div key={ruolo} className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500">{ruolo}</h4>
              <div className="space-y-1.5">
                {ops.map(op => (
                  <div key={op.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`op-${op.id}`}
                      checked={!!operatoriSelezionati[op.id]}
                      onChange={() => toggleOperatore(op.id)}
                      className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                    />
                    <Label htmlFor={`op-${op.id}`} className="text-sm cursor-pointer">
                      {op.nome} {op.cognome}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {operatori.length === 0 && (
            <p className="text-sm text-gray-500">
              Non ci sono operatori disponibili. Aggiungili nella sezione Team.
            </p>
          )}
        </div>
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
