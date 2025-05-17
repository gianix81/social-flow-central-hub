
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, CheckSquare, Edit } from "lucide-react";

const DettaglioProgetto = () => {
  const { id } = useParams<{ id: string }>();
  
  // In un'app reale, recupereresti i dati del progetto in base all'ID
  const progetto = {
    id: parseInt(id || "0"),
    nome: `Progetto ${id}`,
    cliente: id && parseInt(id) > 200 ? "EcoGreen" : id && parseInt(id) > 100 ? "TechBolt" : "FashionStyle",
    clienteId: id && parseInt(id) > 200 ? 3 : id && parseInt(id) > 100 ? 1 : 2,
    stato: "In Corso",
    descrizione: "Questa è una descrizione di esempio del progetto. In un'applicazione reale, conterrebbe informazioni dettagliate sull'ambito del progetto, gli obiettivi e altri dettagli rilevanti.",
    dataInizio: "1 Maggio 2025",
    dataScadenza: "30 Giugno 2025"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/progetti">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{progetto.nome}</h1>
            <div className="flex items-center gap-2">
              <Link 
                to={`/clienti/${progetto.clienteId}`}
                className="text-brand hover:text-brand-dark text-sm"
              >
                {progetto.cliente}
              </Link>
              <span className="text-gray-400">•</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                progetto.stato === 'Attivo' || progetto.stato === 'In Corso' 
                  ? 'bg-green-50 text-green-700' 
                  : progetto.stato === 'Pianificazione' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {progetto.stato}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Modifica Progetto
          </Button>
        </div>
      </div>

      <Tabs defaultValue="panoramica" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 h-auto">
          <TabsTrigger value="panoramica" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Panoramica</TabsTrigger>
          <TabsTrigger value="attivita" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Attività</TabsTrigger>
          <TabsTrigger value="contenuti" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Contenuti</TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Team</TabsTrigger>
        </TabsList>
        
        <TabsContent value="panoramica" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Dettagli Progetto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{progetto.descrizione}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Data Inizio</h4>
                      <p className="mt-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{progetto.dataInizio}</span>
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Scadenza</h4>
                      <p className="mt-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{progetto.dataScadenza}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 mt-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">Avanzamento Progetto</h4>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                      <div className="bg-brand h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>45% completato</span>
                      <span>9 di 20 attività completate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Attività Recenti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <CheckSquare className="h-4 w-4 mt-0.5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium">Creare grafiche social media</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-yellow-50 text-yellow-800 px-2 py-0.5 rounded-full">In Corso</span>
                          <span className="text-xs text-gray-500">Scadenza 25 Maggio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <CheckSquare className="h-4 w-4 mt-0.5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium">Scrivere bozza post blog</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-green-50 text-green-800 px-2 py-0.5 rounded-full">Completato</span>
                          <span className="text-xs text-gray-500">18 Maggio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <CheckSquare className="h-4 w-4 mt-0.5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium">Programmare riunione di revisione cliente</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full">In Attesa</span>
                          <span className="text-xs text-gray-500">Scadenza 30 Maggio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-2">Vedi Tutte le Attività</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="attivita">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Attività e Da Fare</h3>
            <p className="text-gray-500 mt-2">L'interfaccia dettagliata di gestione delle attività sarà visualizzata qui.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="contenuti">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Gestione Contenuti</h3>
            <p className="text-gray-500 mt-2">I contenuti e le risorse del progetto saranno visualizzati qui.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="team">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Gestione Team</h3>
            <p className="text-gray-500 mt-2">I membri del team e le responsabilità saranno visualizzate qui.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DettaglioProgetto;
