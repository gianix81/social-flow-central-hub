
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Newspaper, Rss, Link, ExternalLink, Trash2 } from "lucide-react";

// Sample RSS feed data - in a real app, this would be saved to a database
const initialFeeds = [
  { id: 1, name: "Il Sole 24 Ore", url: "https://www.ilsole24ore.com/rss/italia.xml", category: "News" },
  { id: 2, name: "La Repubblica", url: "https://www.repubblica.it/rss/homepage/rss2.0.xml", category: "News" }
];

// Sample articles - in a real app, these would be fetched from the RSS feeds
const initialArticles = [
  { 
    id: 1, 
    title: "Mercati finanziari in ripresa dopo il ribasso di giovedì", 
    feedName: "Il Sole 24 Ore",
    date: "2025-05-15", 
    url: "#", 
    summary: "I mercati finanziari globali hanno mostrato segni di ripresa dopo il brusco calo registrato nella giornata di giovedì, con gli indici principali che hanno recuperato parte delle perdite." 
  },
  { 
    id: 2, 
    title: "Nuove politiche ambientali in discussione al parlamento europeo", 
    feedName: "La Repubblica",
    date: "2025-05-15", 
    url: "#", 
    summary: "Il parlamento europeo si riunisce oggi per discutere le nuove politiche ambientali proposte dalla Commissione, con particolare attenzione alla riduzione delle emissioni di CO2 entro il 2030." 
  },
  { 
    id: 3, 
    title: "Innovazione nel settore della robotica: nuove applicazioni in ambito sanitario", 
    feedName: "Il Sole 24 Ore",
    date: "2025-05-14", 
    url: "#", 
    summary: "Le nuove tecnologie robotiche stanno rivoluzionando il settore sanitario, con applicazioni che vanno dalla chirurgia di precisione all'assistenza domiciliare per pazienti anziani o con mobilità ridotta." 
  },
];

// Form schema for adding a new RSS feed
const formSchema = z.object({
  name: z.string().min(1, "Il nome è obbligatorio"),
  url: z.string().url("Inserisci un URL valido").min(1, "L'URL è obbligatorio"),
  category: z.string().min(1, "La categoria è obbligatoria")
});

const OsservatorioWeb = () => {
  const [feeds, setFeeds] = useState(initialFeeds);
  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Setup form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      category: "News"
    }
  });
  
  // Add new feed
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newFeed = {
      id: feeds.length + 1,
      name: values.name,
      url: values.url,
      category: values.category
    };
    
    setFeeds([...feeds, newFeed]);
    form.reset();
    toast.success("Feed RSS aggiunto con successo");
    
    // In a real app, we would fetch articles from the new feed here
    // For now, we'll just simulate it with a toast
    toast.info("Scaricamento articoli in corso...", {
      duration: 2000
    });
    
    // Simulate fetching new articles after 2 seconds
    setTimeout(() => {
      toast.success("Articoli aggiornati");
    }, 2000);
  };
  
  // Delete feed
  const deleteFeed = (id: number) => {
    setFeeds(feeds.filter(feed => feed.id !== id));
    toast.success("Feed rimosso con successo");
  };
  
  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           article.summary.toLowerCase().includes(searchTerm.toLowerCase());
                           
    const matchesCategory = selectedCategory 
      ? feeds.find(feed => feed.name === article.feedName)?.category === selectedCategory 
      : true;
      
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories
  const categories = [...new Set(feeds.map(feed => feed.category))];
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Osservatorio Web</h1>
          <p className="text-muted-foreground">Monitora le ultime notizie dai tuoi feed RSS preferiti.</p>
        </div>
      </div>
      
      <Tabs defaultValue="notizie" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 mb-4">
          <TabsTrigger value="notizie">Notizie</TabsTrigger>
          <TabsTrigger value="feeds">Gestione Feed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notizie" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-2/3">
              <Input
                placeholder="Cerca articoli..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-1/3">
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Tutte le categorie</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {filteredArticles.length === 0 ? (
            <Card className="w-full p-6 text-center">
              <Newspaper className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Nessun articolo trovato</h3>
              <p className="text-muted-foreground">Prova a modificare i criteri di ricerca o aggiungi nuovi feed RSS.</p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span>
                        <span className="font-medium">{article.feedName}</span> • {article.date}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{article.summary}</p>
                  </CardContent>
                  <CardFooter className="bg-muted/50 p-4">
                    <Button variant="outline" className="ml-auto" asChild>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        Leggi articolo completo
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="feeds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aggiungi nuovo feed RSS</CardTitle>
              <CardDescription>
                Inserisci l'URL del feed RSS che desideri monitorare
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="La Repubblica" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL Feed RSS</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <FormControl>
                            <Input placeholder="News, Tech, Sport..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="mt-2">
                    <Rss className="mr-2 h-4 w-4" />
                    Aggiungi Feed
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feed RSS configurati</CardTitle>
              <CardDescription>
                Gestisci i tuoi feed RSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              {feeds.length === 0 ? (
                <div className="text-center py-6">
                  <Rss className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Nessun feed RSS configurato</h3>
                  <p className="text-muted-foreground">Aggiungi il tuo primo feed RSS usando il form sopra.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="w-[100px]">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeds.map((feed) => (
                      <TableRow key={feed.id}>
                        <TableCell className="font-medium">{feed.name}</TableCell>
                        <TableCell>{feed.category}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          <a 
                            href={feed.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:underline"
                          >
                            <Link className="mr-1 h-4 w-4" />
                            {feed.url}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            onClick={() => deleteFeed(feed.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          
          <div className="bg-muted/50 p-4 rounded-md">
            <h3 className="font-medium">Note su RSS</h3>
            <p className="text-sm text-muted-foreground mt-1">
              RSS (Really Simple Syndication) è un formato standard per la distribuzione di contenuti web.
              Per aggiungere un feed, cercate l'icona <Rss className="inline h-4 w-4" /> sul sito web che desiderate monitorare.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OsservatorioWeb;
