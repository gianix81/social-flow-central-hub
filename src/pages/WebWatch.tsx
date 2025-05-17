
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  Check, 
  ExternalLink, 
  Eye, 
  Filter, 
  Globe, 
  Newspaper, 
  Search, 
  Settings, 
  UserCheck, 
  Mail
} from "lucide-react";

const WebWatch = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Web Watch</h1>
          <p className="text-gray-600">Monitor web mentions, news, and alerts about your clients</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Connect Email
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <TabsList className="bg-muted h-9">
            <TabsTrigger value="all" className="text-xs">All Updates</TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs">Alerts</TabsTrigger>
            <TabsTrigger value="mentions" className="text-xs">Mentions</TabsTrigger>
            <TabsTrigger value="news" className="text-xs">Industry News</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 md:flex-none">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search updates..." className="pl-9 h-9" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="all">All Clients</option>
              <option value="techbolt">TechBolt</option>
              <option value="fashionstyle">FashionStyle</option>
              <option value="ecogreen">EcoGreen</option>
            </select>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Web Watch Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {/* Alert - Critical */}
                    <div className="p-4 border border-red-100 bg-red-50 rounded-lg">
                      <div className="flex gap-3">
                        <div className="bg-red-100 p-2 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">Critical Alert</span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">FashionStyle</span>
                          </div>
                          <h3 className="font-medium mt-1">Negative Product Review on Fashion Insider Blog</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Popular fashion blog "Fashion Insider" published a critical review of FashionStyle's new summer collection, citing quality concerns.
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-xs text-gray-500">1 hour ago · via Email Alert</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                <Eye className="mr-1 h-3 w-3" />
                                View Source
                              </Button>
                              <Button size="sm" className="text-xs h-7">
                                <Check className="mr-1 h-3 w-3" />
                                Mark as Handled
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* News */}
                    <div className="p-4 border rounded-lg">
                      <div className="flex gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Newspaper className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">News Mention</span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">TechBolt</span>
                          </div>
                          <h3 className="font-medium mt-1">TechBolt Featured in "Top 10 Tech Innovations" Article</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            TechBolt's new product was featured in TechDaily's monthly roundup of innovative tech solutions.
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-xs text-gray-500">3 hours ago · via Google Alerts</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                Read Article
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                <Check className="mr-1 h-3 w-3" />
                                Acknowledge
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Competitor Activity */}
                    <div className="p-4 border rounded-lg">
                      <div className="flex gap-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <UserCheck className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">Competitor</span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">EcoGreen</span>
                          </div>
                          <h3 className="font-medium mt-1">EcoGreen Competitor Launches Similar Packaging Campaign</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            GreenLife, a direct competitor to EcoGreen, has announced a new sustainable packaging initiative similar to our client's recent campaign.
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-xs text-gray-500">Yesterday at 2:45 PM · via Industry Newsletter</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                <Eye className="mr-1 h-3 w-3" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Industry News */}
                    <div className="p-4 border rounded-lg">
                      <div className="flex gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Globe className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">Industry News</span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">FashionStyle</span>
                          </div>
                          <h3 className="font-medium mt-1">New Sustainable Fabric Technology Breakthrough</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            A research team has announced a breakthrough in sustainable fabric technology that could impact the fashion industry.
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-xs text-gray-500">2 days ago · via RSS Feed</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                Read More
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Keyword Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-sm font-medium">TechBolt</span>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700">TechBolt</span>
                      <span className="text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700">Smart Home</span>
                      <span className="text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700">IoT Technology</span>
                      <span className="text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700">Tech Innovations</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span className="text-sm font-medium">FashionStyle</span>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-purple-50 px-2 py-1 rounded-full text-purple-700">FashionStyle</span>
                      <span className="text-xs bg-purple-50 px-2 py-1 rounded-full text-purple-700">Summer Collection</span>
                      <span className="text-xs bg-purple-50 px-2 py-1 rounded-full text-purple-700">Sustainable Fashion</span>
                      <span className="text-xs bg-purple-50 px-2 py-1 rounded-full text-purple-700">Fashion Trends</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-sm font-medium">EcoGreen</span>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-green-50 px-2 py-1 rounded-full text-green-700">EcoGreen</span>
                      <span className="text-xs bg-green-50 px-2 py-1 rounded-full text-green-700">Sustainability</span>
                      <span className="text-xs bg-green-50 px-2 py-1 rounded-full text-green-700">Eco-Friendly Packaging</span>
                      <span className="text-xs bg-green-50 px-2 py-1 rounded-full text-green-700">Green Initiatives</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full text-sm">
                    Add New Keyword
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Alert Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm">Critical</span>
                      </div>
                      <span className="font-medium">1</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 bg-amber-50 rounded">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm">Important</span>
                      </div>
                      <span className="font-medium">3</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <div className="flex items-center gap-2">
                        <Newspaper className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Mentions</span>
                      </div>
                      <span className="font-medium">12</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Resolved</span>
                      </div>
                      <span className="font-medium">5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Critical Alerts & Notifications</h3>
            <p className="text-gray-500 mt-2">High priority alerts requiring attention will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="mentions">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Brand & Client Mentions</h3>
            <p className="text-gray-500 mt-2">Media mentions and social references to your clients will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="news">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Industry News & Updates</h3>
            <p className="text-gray-500 mt-2">Relevant news and industry trends will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebWatch;
