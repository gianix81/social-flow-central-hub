
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { type Cliente } from '@/hooks/useClienti';

// Tipo per i dati del form cliente (senza id)
export type FormClienteData = Omit<Cliente, 'id'>;

// Componente Form per l'inserimento o modifica di un cliente
export const FormCliente = ({
  cliente,
  onSalva,
  onAnnulla
}: {
  cliente?: Cliente;
  onSalva: (cliente: FormClienteData) => void;
  onAnnulla: () => void;
}) => {
  const [formData, setFormData] = useState<FormClienteData>({
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
