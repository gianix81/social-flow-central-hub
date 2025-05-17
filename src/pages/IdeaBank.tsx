
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Filter, 
  Lightbulb, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Tag, 
  Tags 
} from "lucide-react";

const IdeaBank = () => {
  // Sample ideas
  const ideas = [
    {
      id: 1,
      title: "Interactive Quiz Series",
      description: "Create weekly interactive quizzes for Instagram Stories that test followers' knowledge about industry topics.",
      client: "TechBolt",
      tags: ["Instagram", "Engagement", "Interactive"],
      color: "blue"
    },
    {
      id: 2,
      title: "Behind-the-Scenes Content",
      description: "Short videos showing the design process, material selection, and craftsmanship behind products.",
      client: "FashionStyle",
      tags: ["Video", "Authenticity", "Brand Story"],
      color: "purple"
    },
    {
      id: 3,
      title: "User-Generated Content Campaign",
      description: "Encourage customers to share photos of themselves using products in creative ways with a branded hashtag.",
      client: "EcoGreen",
      tags: ["UGC", "Community", "Hashtag"],
      color: "green"
    },
    {
      id: 4,
      title: "Expert Interview Series",
      description: "Monthly interviews with industry experts discussing trends, innovations, and answering follower questions.",
      client: "TechBolt",
      tags: ["Thought Leadership", "Video", "Blog"],
      color: "blue"
    },
    {
      id: 5,
      title: "Sustainable Tips Series",
      description: "Weekly posts sharing practical sustainability tips related to our products and industry.",
      client: "EcoGreen",
      tags: ["Education", "Tips", "Sustainability"],
      color: "green"
    },
    {
      id: 6,
      title: "Style Challenge",
      description: "Multi-day challenge where followers style the same item in different ways and share their looks.",
      client: "FashionStyle",
      tags: ["Challenge", "UGC", "Engagement"],
      color: "purple"
    }
  ];

  // Get client color
  const getClientColor = (client: string) => {
    switch(client) {
      case "TechBolt":
        return "bg-blue-50 text-blue-700";
      case "FashionStyle":
        return "bg-purple-50 text-purple-700";
      case "EcoGreen":
        return "bg-green-50 text-green-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Idea Bank</h1>
          <p className="text-gray-600">Store and organize your creative ideas</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Idea
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search ideas..."
            className="pl-9 h-9"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none">
            <Tags className="mr-2 h-4 w-4" />
            Tags
          </Button>
          <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All Clients</option>
            <option value="techbolt">TechBolt</option>
            <option value="fashionstyle">FashionStyle</option>
            <option value="ecogreen">EcoGreen</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <Card key={idea.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className={`p-2 rounded-md ${
                    idea.client === 'TechBolt' ? 'bg-blue-100' : 
                    idea.client === 'FashionStyle' ? 'bg-purple-100' : 'bg-green-100'
                  }`}>
                    <Lightbulb className={`h-5 w-5 ${
                      idea.client === 'TechBolt' ? 'text-blue-600' : 
                      idea.client === 'FashionStyle' ? 'text-purple-600' : 'text-green-600'
                    }`} />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getClientColor(idea.client)}`}>
                    {idea.client}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <h3 className="text-lg font-semibold mt-3">{idea.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{idea.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {idea.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                    <Tag className="h-3 w-3" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="text-xs">Convert to Task</Button>
                <Button variant="outline" size="sm" className="text-xs">Add to Content</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="border-dashed hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer min-h-[220px]">
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-brand" />
            </div>
            <h3 className="text-lg font-medium mt-3">Capture New Idea</h3>
            <p className="text-sm text-gray-500 mt-1">Click to add a new creative concept</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IdeaBank;
