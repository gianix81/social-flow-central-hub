
import React from 'react';
import { type Evento } from '@/hooks/useCalendario';
import { format } from 'date-fns';
import { useProgetti } from '@/hooks/useProgetti';
import { useOperatori } from '@/hooks/useOperatori';

type EventoCalendarioProps = {
  evento: Evento;
  onClick?: (evento: Evento) => void;
};

export const EventoCalendario: React.FC<EventoCalendarioProps> = ({ evento, onClick }) => {
  const { getProgettoById } = useProgetti();
  const { operatori } = useOperatori();
  
  // Ottiene il progetto associato all'evento
  const progetto = evento.progettoId ? getProgettoById(evento.progettoId) : undefined;
  
  // Ottiene gli operatori coinvolti nell'evento
  const operatoriEvento = operatori.filter(op => evento.operatoriIds.includes(op.id));

  // Determina il colore dello sfondo in base al tipo di evento
  const getBgColor = () => {
    switch (evento.tipo) {
      case 'Riunione':
        return 'bg-blue-100 text-blue-800';
      case 'Scadenza':
        return 'bg-red-100 text-red-800';
      case 'Pubblicazione':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  const handleClick = () => {
    if (onClick) onClick(evento);
  };

  return (
    <div 
      className={`text-xs p-1 rounded ${getBgColor()} truncate cursor-pointer hover:opacity-80`}
      onClick={handleClick}
    >
      {evento.dataInizio && (
        <span className="font-medium">
          {format(new Date(evento.dataInizio), 'HH:mm')}
          {evento.dataFine && ` - ${format(new Date(evento.dataFine), 'HH:mm')}`}
        </span>
      )} {' '}
      {evento.titolo}
      
      {/* Se l'evento ha un progetto associato, mostralo */}
      {progetto && (
        <div className="text-xxs opacity-80 truncate mt-0.5">
          Progetto: {progetto.nome}
        </div>
      )}
    </div>
  );
};
