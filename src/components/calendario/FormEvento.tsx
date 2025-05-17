
import React, { useState, useEffect } from 'react';
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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgetti } from '@/hooks/useProgetti';
import { useOperatori } from '@/hooks/useOperatori';
import { type Evento, TipoEvento } from '@/hooks/useCalendario';

// Tipi evento disponibili
const tipiEvento: TipoEvento[] = ["Riunione", "Scadenza", "Pubblicazione", "Altro"];

// Componente Form per l'inserimento o modifica di un evento
export const FormEvento = ({
  evento,
  onSalva,
  onAnnulla
}: {
  evento?: Evento;
  onSalva: (evento: Omit<Evento, "id">) => void;
  onAnnulla: () => void;
}) => {
  const { progetti } = useProgetti();
  const { operatori } = useOperatori();
  
  const [formData, setFormData] = useState<Omit<Evento, "id">>({
    titolo: evento?.titolo || '',
    descrizione: evento?.descrizione || '',
    dataInizio: evento?.dataInizio || new Date(),
    dataFine: evento?.dataFine,
    progettoId: evento?.progettoId,
    operatoriIds: evento?.operatoriIds || [],
    tipo: evento?.tipo || "Altro",
    completato: evento?.completato || false
  });

  const [operatoriSelezionati, setOperatoriSelezionati] = useState<Record<number, boolean>>(
    evento?.operatoriIds.reduce((obj, id) => ({ ...obj, [id]: true }), {}) || {}
  );
  
  // Gestione dell'orario di inizio e fine
  const [oraInizio, setOraInizio] = useState(
    evento?.dataInizio ? format(evento.dataInizio, "HH:mm") : "09:00"
  );
  
  const [oraFine, setOraFine] = useState(
    evento?.dataFine ? format(evento.dataFine, "HH:mm") : "10:00"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    const valToStore = name === 'progettoId' ? parseInt(value) : value;
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

  // Combina la data e l'ora selezionate in un oggetto Date
  const combineDateTime = (date: Date, timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    return newDate;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combina data e ora prima di salvare
    const dataInizioCompleta = combineDateTime(formData.dataInizio, oraInizio);
    let dataFineCompleta = formData.dataFine && oraFine 
      ? combineDateTime(formData.dataFine, oraFine) 
      : undefined;
      
    // Se non è stata specificata una data di fine, usa la stessa di inizio
    if (!dataFineCompleta && oraFine) {
      dataFineCompleta = combineDateTime(formData.dataInizio, oraFine);
    }
    
    onSalva({
      ...formData,
      dataInizio: dataInizioCompleta,
      dataFine: dataFineCompleta
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
      <div className="space-y-2">
        <Label htmlFor="titolo">Titolo Evento</Label>
        <Input 
          id="titolo" 
          name="titolo" 
          value={formData.titolo} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tipo">Tipo Evento</Label>
        <Select 
          value={formData.tipo} 
          onValueChange={(value) => handleSelectChange('tipo', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleziona un tipo" />
          </SelectTrigger>
          <SelectContent>
            {tipiEvento.map(tipo => (
              <SelectItem key={tipo} value={tipo}>
                {tipo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Data Inizio</Label>
        <div className="flex flex-col space-y-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !formData.dataInizio && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dataInizio ? format(formData.dataInizio, "dd/MM/yyyy") : <span>Seleziona una data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.dataInizio}
                onSelect={(date) => date && setFormData(prev => ({ ...prev, dataInizio: date }))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <Input
              type="time"
              value={oraInizio}
              onChange={(e) => setOraInizio(e.target.value)}
              className="w-32"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Data Fine (opzionale)</Label>
        <div className="flex flex-col space-y-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !formData.dataFine && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dataFine ? format(formData.dataFine, "dd/MM/yyyy") : <span>Seleziona una data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.dataFine}
                onSelect={(date) => setFormData(prev => ({ ...prev, dataFine: date || undefined }))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <Input
              type="time"
              value={oraFine}
              onChange={(e) => setOraFine(e.target.value)}
              className="w-32"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="progettoId">Progetto (opzionale)</Label>
        <Select 
          value={formData.progettoId?.toString() || ""} 
          onValueChange={(value) => handleSelectChange('progettoId', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleziona un progetto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Nessun progetto</SelectItem>
            {progetti.map(progetto => (
              <SelectItem key={progetto.id} value={progetto.id.toString()}>
                {progetto.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="descrizione">Descrizione</Label>
        <Textarea 
          id="descrizione" 
          name="descrizione" 
          value={formData.descrizione || ''} 
          onChange={handleChange} 
          placeholder="Aggiungi una descrizione..." 
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Operatori Coinvolti</Label>
        <div className="border rounded-md p-4 space-y-4 max-h-[200px] overflow-y-auto">
          {operatori.length === 0 ? (
            <p className="text-sm text-gray-500">
              Non ci sono operatori disponibili. Aggiungili nella sezione Team.
            </p>
          ) : (
            operatori.map(op => (
              <div key={op.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`op-${op.id}`}
                  checked={!!operatoriSelezionati[op.id]}
                  onChange={() => toggleOperatore(op.id)}
                  className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                />
                <Label htmlFor={`op-${op.id}`} className="text-sm cursor-pointer">
                  {op.nome} {op.cognome} ({op.ruolo})
                </Label>
              </div>
            ))
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
