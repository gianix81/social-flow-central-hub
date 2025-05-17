
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClienti } from '@/hooks/useClienti';
import { useProgetti } from '@/hooks/useProgetti';
import { useCollaboratori } from '@/hooks/useCollaboratori';
import { useCalendario } from '@/hooks/useCalendario';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SvegliPromemoria } from '@/components/SvegliPromemoria';
import { format, addMonths } from 'date-fns';
import { it } from 'date-fns/locale';
import { EventoCalendario } from '@/components/calendario/EventoCalendario';

const Dashboard = () => {
  const { clienti } = useClienti();
  const { progetti } = useProgetti();
  const { collaboratori } = useCollaboratori();
  const { eventi } = useCalendario();
  const [progettiPerCliente, setProgettiPerCliente] = useState<{ name: string; progetti: number; }[]>([]);
  const [progettiPerStato, setProgettiPerStato] = useState<{ name: string; value: number; }[]>([]);

  // Aggiornamento dei dati del grafico quando cambiano clienti o progetti
  useEffect(() => {
    // Calcola progetti per cliente
    const conteggioProgettiPerCliente = clienti.map(cliente => {
      const progettiDelCliente = progetti.filter(p => p.clienteId === cliente.id);
      return {
        name: cliente.nome,
        progetti: progettiDelCliente.length
      };
    }).filter(item => item.progetti > 0);

    setProgettiPerCliente(conteggioProgettiPerCliente);

    // Calcola progetti per stato
    const statiProgetti = progetti.reduce((acc: Record<string, number>, progetto) => {
      const stato = progetto.stato || 'Non specificato';
      acc[stato] = (acc[stato] || 0) + 1;
      return acc;
    }, {});

    const datiStatiProgetti = Object.entries(statiProgetti).map(([name, value]) => ({ name, value }));
    setProgettiPerStato(datiStatiProgetti);
  }, [clienti, progetti]);

  const oggi = new Date();
  const prossimeScadenze = eventi
    .filter(evento => {
      const dataInizio = new Date(evento.dataInizio);
      return dataInizio >= oggi && dataInizio <= addMonths(oggi, 1);
    })
    .sort((a, b) => new Date(a.dataInizio).getTime() - new Date(b.dataInizio).getTime())
    .slice(0, 5);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Panoramica delle attività e dei progetti</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Totale Clienti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{clienti.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Totale Progetti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progetti.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Totale Collaboratori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{collaboratori.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Progetti per Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            {progettiPerCliente.length > 0 ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={progettiPerCliente}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="progetti" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                Nessun progetto disponibile
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Progetti per Stato</CardTitle>
          </CardHeader>
          <CardContent>
            {progettiPerStato.length > 0 ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={300}>
                    <Pie
                      data={progettiPerStato}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {progettiPerStato.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                Nessun dato disponibile
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Prossime Scadenze</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {prossimeScadenze.length > 0 ? (
              <div className="space-y-2">
                {prossimeScadenze.map((evento) => (
                  <div key={evento.id} className="flex items-center gap-2">
                    <div className="min-w-[80px] text-xs">
                      {format(new Date(evento.dataInizio), 'dd MMM', { locale: it })}
                    </div>
                    <div className="flex-1">
                      <EventoCalendario evento={evento} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                Nessuna scadenza nei prossimi 30 giorni
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Promemoria</CardTitle>
          </CardHeader>
          <CardContent>
            <SvegliPromemoria />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
