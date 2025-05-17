
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus
} from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { it } from 'date-fns/locale';
import { useCalendario, useProgettieCalendario, type Evento } from '@/hooks/useCalendario';
import { FormEvento } from '@/components/calendario/FormEvento';
import { EventoCalendario } from '@/components/calendario/EventoCalendario';

const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogoApertoAggiungi, setDialogoApertoAggiungi] = useState(false);
  const [dialogoApertoModifica, setDialogoApertoModifica] = useState(false);
  const [eventoSelezionato, setEventoSelezionato] = useState<Evento | null>(null);

  const { eventi, aggiungiEvento, modificaEvento, eliminaEvento } = useCalendario();
  const { sincronizzaProgettiCalendario } = useProgettieCalendario();

  // Sincronizza le scadenze dei progetti con il calendario
  useEffect(() => {
    sincronizzaProgettiCalendario();
  }, []);

  // Ottiene il primo e l'ultimo giorno del mese corrente
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  
  // Genera un array di giorni per il mese corrente
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  // Determina il primo giorno della settimana (0 = Domenica, 1 = Lunedì, ...)
  const firstDayOfWeek = startDate.getDay();
  
  // Aggiungi giorni dal mese precedente
  const prevMonthDays = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(startDate);
    date.setDate(date.getDate() - i);
    prevMonthDays.push(date);
  }
  
  // Determina l'ultimo giorno del mese (0 = Domenica, 1 = Lunedì, ...)
  const lastDayOfWeek = endDate.getDay();
  
  // Aggiungi giorni dal mese successivo
  const nextMonthDays = [];
  for (let i = 1; i < 7 - lastDayOfWeek; i++) {
    const date = new Date(endDate);
    date.setDate(date.getDate() + i);
    nextMonthDays.push(date);
  }
  
  // Combina tutti i giorni per la vista del calendario
  const calendarDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];

  // Funzione per ottenere gli eventi di un giorno specifico
  const getEventiGiorno = (giorno: Date) => {
    return eventi.filter(evento => {
      const evtDate = new Date(evento.dataInizio);
      return isSameDay(evtDate, giorno);
    });
  };

  // Gestione del cambio mese
  const handlePrevMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Gestione del salvataggio di un evento
  const handleSalvaEvento = (evento: Omit<Evento, "id">) => {
    aggiungiEvento(evento);
    setDialogoApertoAggiungi(false);
    toast({
      title: "Evento aggiunto",
      description: `L'evento "${evento.titolo}" è stato aggiunto al calendario.`
    });
  };

  // Gestione della modifica di un evento
  const handleModificaEvento = (evento: Omit<Evento, "id">) => {
    if (eventoSelezionato) {
      modificaEvento(eventoSelezionato.id, evento);
      setDialogoApertoModifica(false);
      setEventoSelezionato(null);
      toast({
        title: "Evento aggiornato",
        description: `L'evento "${evento.titolo}" è stato aggiornato.`
      });
    }
  };

  // Gestione dell'eliminazione di un evento
  const handleEliminaEvento = () => {
    if (eventoSelezionato) {
      eliminaEvento(eventoSelezionato.id);
      setDialogoApertoModifica(false);
      setEventoSelezionato(null);
      toast({
        title: "Evento eliminato",
        description: `L'evento è stato eliminato dal calendario.`
      });
    }
  };

  // Gestione del click su un evento
  const handleEventoClick = (evento: Evento) => {
    setEventoSelezionato(evento);
    setDialogoApertoModifica(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agenda e Calendario</h1>
          <p className="text-gray-600">Pianifica e gestisci il tuo calendario editoriale</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleToday}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Oggi
          </Button>
          <div className="flex bg-muted rounded-md">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => setDialogoApertoAggiungi(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi Evento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{format(currentDate, 'MMMM yyyy', { locale: it })}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <div className="grid grid-cols-7 text-center border-b">
                <div className="p-2 font-medium border-r last:border-r-0">Dom</div>
                <div className="p-2 font-medium border-r last:border-r-0">Lun</div>
                <div className="p-2 font-medium border-r last:border-r-0">Mar</div>
                <div className="p-2 font-medium border-r last:border-r-0">Mer</div>
                <div className="p-2 font-medium border-r last:border-r-0">Gio</div>
                <div className="p-2 font-medium border-r last:border-r-0">Ven</div>
                <div className="p-2 font-medium border-r last:border-r-0">Sab</div>
              </div>
              
              {/* Griglia del calendario */}
              <div className="grid grid-cols-7 min-h-[600px]">
                {calendarDays.map((day, idx) => {
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const isToday = isSameDay(day, new Date());
                  const eventiGiorno = getEventiGiorno(day);
                  
                  return (
                    <div 
                      key={idx} 
                      className={`min-h-[100px] p-1 border-r border-b last:border-r-0 ${
                        !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                      } ${isToday ? 'bg-brand-50' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="flex justify-between p-1">
                        <span className={`text-sm ${isToday ? 'font-bold text-brand' : ''}`}>
                          {day.getDate()}
                        </span>
                        {eventiGiorno.length > 0 && (
                          <span className="text-xs text-white bg-brand rounded-full px-1.5">
                            {eventiGiorno.length}
                          </span>
                        )}
                      </div>
                      
                      {eventiGiorno.length > 0 && (
                        <div className="mt-1 space-y-1">
                          {eventiGiorno.map((evento) => (
                            <EventoCalendario 
                              key={evento.id} 
                              evento={evento} 
                              onClick={handleEventoClick}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogo per aggiungere un evento */}
      <Dialog open={dialogoApertoAggiungi} onOpenChange={setDialogoApertoAggiungi}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Aggiungi Evento</DialogTitle>
          </DialogHeader>
          <FormEvento 
            onSalva={handleSalvaEvento} 
            onAnnulla={() => setDialogoApertoAggiungi(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialogo per modificare un evento */}
      <Dialog open={dialogoApertoModifica} onOpenChange={setDialogoApertoModifica}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Modifica Evento</DialogTitle>
          </DialogHeader>
          {eventoSelezionato && (
            <>
              <FormEvento 
                evento={eventoSelezionato}
                onSalva={handleModificaEvento} 
                onAnnulla={() => setDialogoApertoModifica(false)}
              />
              <div className="flex justify-end mt-4">
                <Button 
                  variant="destructive" 
                  onClick={handleEliminaEvento}
                >
                  Elimina Evento
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendario;
