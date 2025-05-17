
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Filter, 
  Lightbulb, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Tag, 
  Tags,
  Link as LinkIcon,
  Video
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Idea {
  id: number;
  title: string;
  description: string;
  niche: string;
  videoLink?: string;
  tags: string[];
  createdAt: Date;
}

const BancaIdee = () => {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: 1,
      title: "Trend del fitness con attrezzi casalinghi",
      description: "Serie di video tutorial che mostrano come allenarsi utilizzando solo oggetti comuni presenti in casa.",
      niche: "Fitness",
      videoLink: "https://www.youtube.com/watch?v=example1",
      tags: ["Fitness", "Home Workout", "Tutorial"],
      createdAt: new Date('2023-11-15')
    },
    {
      id: 2,
      title: "Ricette vegetariane veloci",
      description: "Raccolta di ricette vegetariane che si preparano in meno di 20 minuti, perfette per chi ha poco tempo.",
      niche: "Cucina",
      videoLink: "https://www.instagram.com/reel/example2/",
      tags: ["Cucina", "Vegetariano", "Veloce"],
      createdAt: new Date('2023-12-05')
    },
    {
      id: 3,
      title: "Recensioni flash di gadget tech",
      description: "Video brevi con recensioni di gadget tecnologici emergenti, focalizzati sui pro e contro principali.",
      niche: "Tecnologia",
      tags: ["Tech", "Recensioni", "Gadget"],
      createdAt: new Date('2024-01-21')
    }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newIdea, setNewIdea] = useState<Omit<Idea, 'id' | 'createdAt' | 'tags'> & { tags: string }>({
    title: '',
    description: '',
    niche: '',
    videoLink: '',
    tags: ''
  });
  
  const { toast } = useToast();

  const handleAddIdea = () => {
    if (!newIdea.title || !newIdea.description || !newIdea.niche) {
      toast({
        title: "Campi mancanti",
        description: "Titolo, descrizione e nicchia sono obbligatori",
        variant: "destructive"
      });
      return;
    }

    const tagsArray = newIdea.tags
      ? newIdea.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      : [];

    const idea: Idea = {
      id: ideas.length > 0 ? Math.max(...ideas.map(idea => idea.id)) + 1 : 1,
      title: newIdea.title,
      description: newIdea.description,
      niche: newIdea.niche,
      videoLink: newIdea.videoLink || undefined,
      tags: tagsArray,
      createdAt: new Date()
    };

    setIdeas([idea, ...ideas]);
    setNewIdea({
      title: '',
      description: '',
      niche: '',
      videoLink: '',
      tags: ''
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Idea aggiunta",
      description: "La tua nuova idea è stata salvata con successo"
    });
  };

  const filteredIdeas = ideas.filter(idea => {
    const searchLower = searchTerm.toLowerCase();
    return (
      idea.title.toLowerCase().includes(searchLower) ||
      idea.description.toLowerCase().includes(searchLower) ||
      idea.niche.toLowerCase().includes(searchLower) ||
      idea.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banca delle Idee</h1>
          <p className="text-gray-600">Archivia e organizza le tue idee creative</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Aggiungi Idea
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cerca idee..."
            className="pl-9 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" />
            Filtri
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none">
            <Tags className="mr-2 h-4 w-4" />
            Tags
          </Button>
          <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">Tutte le nicchie</option>
            <option value="fitness">Fitness</option>
            <option value="cucina">Cucina</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="moda">Moda</option>
            <option value="viaggi">Viaggi</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <Card key={idea.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-md bg-purple-100">
                    <Lightbulb className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700">
                    {idea.niche}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <h3 className="text-lg font-semibold mt-3">{idea.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">{idea.description}</p>
              
              {idea.videoLink && (
                <div className="flex items-center gap-2 mt-3 text-sm text-blue-600">
                  <Video className="h-4 w-4" />
                  <a 
                    href={idea.videoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="truncate hover:underline"
                  >
                    {idea.videoLink}
                  </a>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mt-4">
                {idea.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                    <Tag className="h-3 w-3" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                <span>
                  {new Date(idea.createdAt).toLocaleDateString('it-IT')}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Card per aggiungere una nuova idea */}
        <Card 
          className="border-dashed hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer min-h-[220px]"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium mt-3">Cattura Nuova Idea</h3>
            <p className="text-sm text-gray-500 mt-1">Clicca per aggiungere un nuovo concetto creativo</p>
          </CardContent>
        </Card>
      </div>

      {/* Dialog per aggiungere una nuova idea */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aggiungi Nuova Idea</DialogTitle>
            <DialogDescription>
              Compila i dettagli della tua nuova idea creativa.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titolo*</Label>
              <Input 
                id="title" 
                value={newIdea.title} 
                onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                placeholder="Inserisci un titolo accattivante per la tua idea"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrizione*</Label>
              <Textarea 
                id="description" 
                value={newIdea.description} 
                onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
                placeholder="Descrivi la tua idea in dettaglio"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="niche">Nicchia/Target*</Label>
              <Input 
                id="niche" 
                value={newIdea.niche} 
                onChange={(e) => setNewIdea({...newIdea, niche: e.target.value})}
                placeholder="Es: Fitness, Cucina, Tecnologia, ecc."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="videoLink" className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" /> 
                Link Video/Reel
              </Label>
              <Input 
                id="videoLink" 
                value={newIdea.videoLink} 
                onChange={(e) => setNewIdea({...newIdea, videoLink: e.target.value})}
                placeholder="https://..."
                type="url"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (separati da virgole)</Label>
              <Input 
                id="tags" 
                value={newIdea.tags} 
                onChange={(e) => setNewIdea({...newIdea, tags: e.target.value})}
                placeholder="Es: video, tutorial, social media"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleAddIdea}>Salva Idea</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BancaIdee;
