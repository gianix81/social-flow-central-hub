
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Mock email accounts data
const mockEmailAccounts = [
  { 
    id: 1, 
    name: "Mail Aziendale", 
    email: "info@azienda.com", 
    server: "mail.azienda.com", 
    username: "info@azienda.com"
  },
  { 
    id: 2, 
    name: "Gmail Personale", 
    email: "nome.cognome@gmail.com", 
    server: "imap.gmail.com", 
    username: "nome.cognome@gmail.com"
  }
];

const Impostazioni = () => {
  const [emailAccounts, setEmailAccounts] = useState(mockEmailAccounts);
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    server: "",
    username: "",
    password: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAccount = () => {
    // In a real app, this would connect to the email server and validate credentials
    setEmailAccounts(prev => [...prev, { ...newAccount, id: Date.now() }]);
    setNewAccount({ name: "", email: "", server: "", username: "", password: "" });
    setIsDialogOpen(false);
    toast.success("Account email aggiunto con successo!");
  };

  const handleDeleteAccount = (id: number) => {
    setEmailAccounts(prev => prev.filter(account => account.id !== id));
    toast.success("Account email rimosso con successo!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Impostazioni</h1>
      </div>
      
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3 mb-4">
          <TabsTrigger value="email">Account Email</TabsTrigger>
          <TabsTrigger value="general">Generali</TabsTrigger>
          <TabsTrigger value="notifications">Notifiche</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Account Email</h2>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Aggiungi Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Aggiungi Account Email</DialogTitle>
                  <DialogDescription>
                    Inserisci i dettagli del tuo account email per accedere alle email direttamente nell'app.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newAccount.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newAccount.email}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="server" className="text-right">Server IMAP</Label>
                    <Input
                      id="server"
                      name="server"
                      value={newAccount.server}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={newAccount.username}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={newAccount.password}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annulla</Button>
                  <Button onClick={handleAddAccount}>Salva</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {emailAccounts.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">Nessun account email configurato</p>
                <p className="text-muted-foreground">Aggiungi un account email per visualizzarlo nell'app</p>
                <Button className="mt-6" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Aggiungi Account
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {emailAccounts.map(account => (
                <Card key={account.id}>
                  <CardHeader>
                    <CardTitle>{account.name}</CardTitle>
                    <CardDescription>{account.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Server:</span>
                        <span>{account.server}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Username:</span>
                        <span>{account.username}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <a href="/contenuti">Visualizza Email</a>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          <div className="bg-muted/50 p-4 rounded-md mt-6">
            <h3 className="font-medium">Nota</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Per motivi di sicurezza, questo sistema consente solo la visualizzazione delle email. 
              Le funzionalità di risposta e inoltro non sono attualmente supportate.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Generali</CardTitle>
              <CardDescription>
                Gestisci le impostazioni generali dell'applicazione
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configurazioni generali da implementare in futuro.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Notifiche</CardTitle>
              <CardDescription>
                Gestisci le preferenze per le notifiche
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configurazioni delle notifiche da implementare in futuro.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Impostazioni;
