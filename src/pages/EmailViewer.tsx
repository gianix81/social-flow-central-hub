
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search,
  Filter, 
  Mail, 
  Star, 
  Trash2, 
  Archive,
  Tag,
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

// Mock email data for demonstration
const mockEmails = [
  {
    id: 1,
    from: "Mario Rossi <mario.rossi@example.com>",
    subject: "Aggiornamento sul progetto TechBolt",
    preview: "Salve, ecco gli ultimi aggiornamenti sul progetto. Abbiamo completato la fase di...",
    date: "16 Mag",
    read: false,
    starred: true,
    folder: "inbox",
    attachments: true
  },
  {
    id: 2,
    from: "Anna Verdi <anna.verdi@example.com>",
    subject: "Proposta di collaborazione",
    preview: "Buongiorno, sarei interessata a discutere una possibile collaborazione per il progetto...",
    date: "15 Mag",
    read: true,
    starred: false,
    folder: "inbox",
    attachments: false
  },
  {
    id: 3,
    from: "Luigi Bianchi <luigi.bianchi@example.com>",
    subject: "Fattura n. 2025-0042",
    preview: "In allegato la fattura richiesta. Rimango a disposizione per qualsiasi chiarimento...",
    date: "14 Mag",
    read: true,
    starred: false,
    folder: "inbox",
    attachments: true
  },
  {
    id: 4,
    from: "Servizio Clienti <support@servizio.com>",
    subject: "Conferma registrazione",
    preview: "Grazie per la registrazione. Il tuo account è stato attivato con successo...",
    date: "13 Mag",
    read: true,
    starred: false,
    folder: "inbox",
    attachments: false
  },
  {
    id: 5,
    from: "Newsletter <news@marketing.com>",
    subject: "Trend di Social Media Marketing - Maggio 2025",
    preview: "Scopri le ultime tendenze nel social media marketing di questo mese...",
    date: "12 Mag",
    read: true,
    starred: false,
    folder: "inbox",
    attachments: false
  },
  {
    id: 6,
    from: "Francesca Neri <francesca@example.com>",
    subject: "Richiesta informazioni",
    preview: "Buongiorno, avrei bisogno di alcune informazioni riguardo i vostri servizi...",
    date: "10 Mag",
    read: true,
    starred: true,
    folder: "archived",
    attachments: false
  },
  {
    id: 7,
    from: "Marco Gialli <marco@example.com>",
    subject: "Invito evento di networking",
    preview: "Sei invitato al nostro evento di networking che si terrà il prossimo mese...",
    date: "9 Mag",
    read: true,
    starred: false,
    folder: "archived",
    attachments: true
  }
];

// Mock email content 
const mockEmailContent = {
  id: 1,
  from: "Mario Rossi <mario.rossi@example.com>",
  to: "me@mycompany.com",
  cc: "team@mycompany.com",
  subject: "Aggiornamento sul progetto TechBolt",
  date: "16 Maggio 2025, 14:30",
  content: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>Salve,</p>
      
      <p>Ecco gli ultimi aggiornamenti sul progetto TechBolt:</p>
      
      <ul>
        <li>Abbiamo completato la fase di progettazione dell'interfaccia utente</li>
        <li>I test di usabilità hanno dato risultati positivi</li>
        <li>Stiamo procedendo con lo sviluppo del backend</li>
      </ul>
      
      <p>La timeline aggiornata prevede il rilascio della versione beta entro il 30 giugno.</p>
      
      <p>In allegato troverai il report dettagliato e le mockup aggiornate.</p>
      
      <p>A disposizione per qualsiasi chiarimento.</p>
      
      <p>Cordiali saluti,<br>
      Mario Rossi<br>
      Project Manager<br>
      TechBolt Solutions</p>
    </div>
  `,
  attachments: [
    { name: "TechBolt_Report_Maggio2025.pdf", size: "2.4 MB" },
    { name: "UI_Mockups_v2.zip", size: "8.7 MB" }
  ]
};

type Folder = "inbox" | "starred" | "sent" | "drafts" | "archived" | "trash";

const EmailViewer = () => {
  const [selectedFolder, setSelectedFolder] = useState<Folder>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmails = mockEmails.filter(email => 
    (selectedFolder === "starred" ? email.starred : email.folder === selectedFolder) &&
    (searchTerm === "" || 
     email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     email.from.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectEmail = (id: number) => {
    setSelectedEmail(id);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email</h1>
          <p className="text-gray-600">Gestione e visualizzazione delle email</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar/Folders */}
        <div className="col-span-1">
          <Card>
            <CardContent className="p-4">
              <NavigationMenu orientation="vertical" className="max-w-full w-full">
                <NavigationMenuList className="flex flex-col w-full space-y-1">
                  <NavigationMenuItem className="w-full">
                    <Button 
                      variant={selectedFolder === "inbox" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setSelectedFolder("inbox")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Posta in arrivo
                      <span className="ml-auto bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5">
                        {mockEmails.filter(e => e.folder === "inbox" && !e.read).length}
                      </span>
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Button 
                      variant={selectedFolder === "starred" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setSelectedFolder("starred")}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Speciali
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Button 
                      variant={selectedFolder === "sent" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setSelectedFolder("sent")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <path d="M22 2L11 13"></path>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                      </svg>
                      Posta inviata
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Button 
                      variant={selectedFolder === "drafts" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setSelectedFolder("drafts")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <path d="M8 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1"></path>
                        <path d="M12 17v-4"></path>
                        <path d="M12 13h4"></path>
                        <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415z"></path>
                      </svg>
                      Bozze
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Button 
                      variant={selectedFolder === "archived" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setSelectedFolder("archived")}
                    >
                      <Archive className="mr-2 h-4 w-4" />
                      Archiviati
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Button 
                      variant={selectedFolder === "trash" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setSelectedFolder("trash")}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Cestino
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </CardContent>
          </Card>
        </div>

        {/* Email List & Content */}
        <div className="col-span-1 lg:col-span-3">
          <Card className="h-full">
            {selectedEmail === null ? (
              // Email list
              <>
                <CardHeader className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {selectedFolder === "inbox" && "Posta in arrivo"}
                      {selectedFolder === "starred" && "Speciali"}
                      {selectedFolder === "sent" && "Posta inviata"}
                      {selectedFolder === "drafts" && "Bozze"}
                      {selectedFolder === "archived" && "Archiviati"}
                      {selectedFolder === "trash" && "Cestino"}
                    </CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Cerca email..."
                          className="pl-9 h-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" className="h-9">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredEmails.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="m22 5-10 7L2 5" />
                      </svg>
                      <h3 className="mt-4 text-lg font-medium">Nessuna email da visualizzare</h3>
                      <p className="mt-2 text-center text-gray-500">
                        Non ci sono email in questa cartella o corrispondenti alla tua ricerca.
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y">
                      {filteredEmails.map((email) => (
                        <li 
                          key={email.id}
                          className={`hover:bg-gray-50 cursor-pointer p-4 ${!email.read ? 'bg-blue-50/30' : ''}`}
                          onClick={() => handleSelectEmail(email.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 pt-1">
                              {email.starred ? 
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> : 
                                <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                              }
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex justify-between">
                                <p className={`text-sm font-medium ${!email.read ? 'font-semibold' : ''}`}>
                                  {email.from.split('<')[0].trim()}
                                </p>
                                <span className="text-xs text-gray-500">{email.date}</span>
                              </div>
                              <p className={`text-sm ${!email.read ? 'font-semibold' : ''}`}>{email.subject}</p>
                              <p className="text-xs text-gray-500 truncate">{email.preview}</p>
                              
                              {/* Indicators */}
                              <div className="flex gap-1 mt-1">
                                {email.attachments && (
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <div className="text-xs text-gray-500">
                    Visualizzazione {filteredEmails.length} email
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" disabled={filteredEmails.length === 0}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" disabled={filteredEmails.length === 0}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              // Email content view
              <>
                <CardHeader className="p-4 border-b">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={handleBackToList}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle className="text-lg">{mockEmailContent.subject}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium">MR</span>
                        </div>
                        <div>
                          <p className="font-medium">{mockEmailContent.from.split('<')[0].trim()}</p>
                          <p className="text-xs text-gray-500">{mockEmailContent.from.match(/<(.+)>/)?.[1]}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{mockEmailContent.date}</p>
                    </div>
                    
                    <div className="text-xs text-gray-500 space-y-1 mb-4">
                      <p><span className="inline-block w-8">A:</span> {mockEmailContent.to}</p>
                      {mockEmailContent.cc && <p><span className="inline-block w-8">CC:</span> {mockEmailContent.cc}</p>}
                    </div>
                  </div>
                  
                  {/* Email content */}
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: mockEmailContent.content }}></div>
                  
                  {/* Attachments */}
                  {mockEmailContent.attachments && mockEmailContent.attachments.length > 0 && (
                    <div className="mt-8 border-t pt-4">
                      <p className="font-medium mb-3">Allegati ({mockEmailContent.attachments.length})</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mockEmailContent.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 border rounded-md">
                            <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.size}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="ml-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" x2="12" y1="15" y2="3" />
                              </svg>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailViewer;
