
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Calendar, 
  FileText, 
  Filter, 
  Image, 
  MoreHorizontal, 
  Plus, 
  Search,
  CheckCircle2,
  Clock,
  AlertCircle, 
} from "lucide-react";

const ContentHub = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Hub</h1>
          <p className="text-gray-600">Manage your content drafts, assets, and publications</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Content
        </Button>
      </div>

      <Tabs defaultValue="drafts">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <TabsList className="bg-muted h-9">
            <TabsTrigger value="drafts" className="text-xs">Drafts & Approvals</TabsTrigger>
            <TabsTrigger value="media" className="text-xs">Media Library</TabsTrigger>
            <TabsTrigger value="published" className="text-xs">Published</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 md:flex-none">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search content..." className="pl-9 h-9" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="drafts" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Content Workflow</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Draft Column */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <h3 className="font-medium">Drafts</h3>
                    </div>
                    <span className="text-xs py-0.5 px-2 rounded-full bg-gray-100">3</span>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Draft Items */}
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-3 bg-white border rounded-lg hover:shadow-sm">
                        <div className="flex justify-between">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">TechBolt</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                        <h4 className="font-medium mt-2 text-sm">
                          {item === 1 ? "Product Feature Highlights" : 
                           item === 2 ? "Tech Tips Newsletter Draft" : 
                           "Innovation Spotlight"}
                        </h4>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {item === 1 ? "Created May 12" : 
                              item === 2 ? "Created May 14" : 
                              "Created May 15"}
                            </span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-purple-700">JD</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full text-sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* In Review Column */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <h3 className="font-medium">In Review</h3>
                    </div>
                    <span className="text-xs py-0.5 px-2 rounded-full bg-gray-100">2</span>
                  </div>
                  
                  <div className="space-y-3">
                    {/* In Review Items */}
                    {[1, 2].map((item) => (
                      <div key={item} className="p-3 bg-white border rounded-lg hover:shadow-sm">
                        <div className="flex justify-between">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                            {item === 1 ? "FashionStyle" : "EcoGreen"}
                          </span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                        <h4 className="font-medium mt-2 text-sm">
                          {item === 1 ? "Summer Collection Campaign" : "Eco-Tips Carousel Post"}
                        </h4>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 text-amber-500" />
                            <span className="text-xs text-amber-500">
                              {item === 1 ? "Client feedback pending" : "Internal review"}
                            </span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-700">AK</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Approved Column */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <h3 className="font-medium">Approved</h3>
                    </div>
                    <span className="text-xs py-0.5 px-2 rounded-full bg-gray-100">2</span>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Approved Items */}
                    {[1, 2].map((item) => (
                      <div key={item} className="p-3 bg-white border rounded-lg hover:shadow-sm">
                        <div className="flex justify-between">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                            {item === 1 ? "EcoGreen" : "TechBolt"}
                          </span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                        <h4 className="font-medium mt-2 text-sm">
                          {item === 1 ? "World Environment Day Post" : "Product Tutorial Video"}
                        </h4>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {item === 1 ? "Scheduled Jun 5" : "Scheduled May 25"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="sm" className="h-6 text-xs">Schedule</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <h2 className="text-lg font-semibold">Media Library</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Image className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
                <Button variant="outline" size="sm">Create Folder</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Folders */}
              {['Client Assets', 'Brand Guidelines', 'Stock Photos', 'Custom Graphics'].map((folder, index) => (
                <Card key={index} className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                      </svg>
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-center">{folder}</h3>
                  </CardContent>
                </Card>
              ))}
              
              {/* Media Items - would be images in a real app */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Card key={item} className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-0 aspect-square bg-gray-100 flex items-center justify-center">
                    <Image className="h-8 w-8 text-gray-400" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="published" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Published Content</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left font-medium text-sm">Title</th>
                    <th className="py-2 px-4 text-left font-medium text-sm">Client</th>
                    <th className="py-2 px-4 text-left font-medium text-sm">Platform</th>
                    <th className="py-2 px-4 text-left font-medium text-sm">Published Date</th>
                    <th className="py-2 px-4 text-left font-medium text-sm">Status</th>
                    <th className="py-2 px-4 text-right font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { title: "Product Launch Announcement", client: "TechBolt", platform: "Instagram", date: "May 10, 2025", status: "Published" },
                    { title: "Summer Style Guide", client: "FashionStyle", platform: "Blog", date: "May 8, 2025", status: "Published" },
                    { title: "Earth Day Campaign", client: "EcoGreen", platform: "Facebook", date: "Apr 22, 2025", status: "Published" },
                    { title: "Tech Tips Series #3", client: "TechBolt", platform: "LinkedIn", date: "Apr 15, 2025", status: "Published" },
                    { title: "Behind-the-Scenes Video", client: "FashionStyle", platform: "TikTok", date: "Apr 12, 2025", status: "Published" },
                  ].map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{item.title}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.client === 'TechBolt' ? 'bg-blue-50 text-blue-700' : 
                          item.client === 'FashionStyle' ? 'bg-purple-50 text-purple-700' : 
                          'bg-green-50 text-green-700'
                        }`}>
                          {item.client}
                        </span>
                      </td>
                      <td className="py-3 px-4">{item.platform}</td>
                      <td className="py-3 px-4">{item.date}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">{item.status}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Analytics</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentHub;
