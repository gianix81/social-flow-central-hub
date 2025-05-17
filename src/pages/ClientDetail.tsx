
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  Edit, 
  FileText, 
  FolderKanban, 
  Mail, 
  MapPin, 
  Phone, 
  Plus, 
  User, 
  Users 
} from "lucide-react";

// Mock client data based on ID
const getClientData = (id: string) => {
  const clients = {
    "1": {
      id: 1,
      name: "TechBolt",
      logo: "TB",
      industry: "Technology",
      status: "Active",
      since: "Jan 2023",
      address: "123 Tech Street, San Francisco, CA 94105",
      email: "contact@techbolt.com",
      phone: "+1 (555) 123-4567",
      website: "www.techbolt.com",
      primaryContact: "Sarah Johnson",
      primaryContactRole: "Marketing Director",
      projects: [
        { id: 101, name: "Website Relaunch", status: "In Progress", deadline: "Jun 30, 2025" },
        { id: 102, name: "Social Media Campaign", status: "Active", deadline: "Ongoing" },
        { id: 103, name: "Product Launch", status: "Planning", deadline: "Aug 15, 2025" }
      ],
      notes: "TechBolt is focused on expanding their social media presence. They prefer professional tone and specific brand colors (blue/gray). Monthly reports required."
    },
    "2": {
      id: 2,
      name: "FashionStyle",
      logo: "FS",
      industry: "Fashion & Retail",
      status: "Active",
      since: "Mar 2023",
      address: "456 Fashion Avenue, New York, NY 10018",
      email: "marketing@fashionstyle.com",
      phone: "+1 (555) 789-0123",
      website: "www.fashionstyle.com",
      primaryContact: "Alex Rivera",
      primaryContactRole: "Creative Director",
      projects: [
        { id: 201, name: "Summer Collection", status: "Active", deadline: "Jun 15, 2025" },
        { id: 202, name: "Influencer Program", status: "In Progress", deadline: "Ongoing" }
      ],
      notes: "FashionStyle requires quick turnaround on content. They prefer vibrant, creative content. Very responsive to messages. Special focus on Instagram and TikTok."
    }
  };
  
  return clients[id as keyof typeof clients] || {
    id: parseInt(id),
    name: "Client " + id,
    logo: "C" + id,
    industry: "Other",
    status: "Active",
    since: "2023",
    address: "Address Information",
    email: "contact@client.com",
    phone: "+1 (555) 555-5555",
    website: "www.client.com",
    primaryContact: "Contact Name",
    primaryContactRole: "Role",
    projects: [],
    notes: "No specific notes available for this client."
  };
};

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const client = getClientData(id || "1");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/clients">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center">
              <span className="font-bold text-lg text-brand-700">{client.logo}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
              <p className="text-gray-600">{client.industry} • Client since {client.since}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Client
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-5 h-auto">
          <TabsTrigger value="overview" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Overview</TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Projects</TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Content</TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Documents</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand hidden md:block">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Company</p>
                        <p className="text-sm text-gray-600">{client.name}</p>
                        <p className="text-sm text-gray-600">{client.industry}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Address</p>
                        <p className="text-sm text-gray-600">{client.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Contact</p>
                        <p className="text-sm text-gray-600">{client.email}</p>
                        <p className="text-sm text-gray-600">{client.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Primary Contact</p>
                        <p className="text-sm text-gray-600">{client.primaryContact}</p>
                        <p className="text-sm text-gray-600">{client.primaryContactRole}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Active Projects</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Project
                  </Button>
                </CardHeader>
                <CardContent>
                  {client.projects.length > 0 ? (
                    <div className="space-y-3">
                      {client.projects.map(project => (
                        <Link to={`/projects/${project.id}`} key={project.id} className="block">
                          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-md bg-brand-50">
                                <FolderKanban className="h-4 w-4 text-brand" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{project.name}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <div className="flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${
                                      project.status === 'Active' || project.status === 'In Progress' 
                                        ? 'bg-green-500' 
                                        : project.status === 'Planning' 
                                        ? 'bg-blue-500' 
                                        : 'bg-gray-500'
                                    }`}></span>
                                    <span className="text-xs text-gray-500">{project.status}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{project.deadline}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ArrowLeft className="h-4 w-4 rotate-180" />
                            </Button>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="rounded-full bg-gray-100 p-3">
                        <FolderKanban className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="mt-3 text-sm font-medium text-gray-900">No projects yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by creating a new project for this client.</p>
                      <Button className="mt-4">Create Project</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Client Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{client.notes}</p>
                  <Button variant="outline" className="w-full mt-4">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Notes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-700">JD</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">Project Manager</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-700">AK</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Alice King</p>
                        <p className="text-xs text-gray-500">Content Creator</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Team
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Create monthly report</p>
                        <span className="text-xs text-gray-500">May 30</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">For: {client.name}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Design social posts</p>
                        <span className="text-xs text-gray-500">Jun 2</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">For: {client.name}</p>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <FileText className="h-4 w-4 mr-2" />
                      View All Tasks
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Projects Content</h3>
            <p className="text-gray-500 mt-2">Project management details will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="content">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Content Management</h3>
            <p className="text-gray-500 mt-2">Content planning and assets will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Documents</h3>
            <p className="text-gray-500 mt-2">Client documents and files will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Activity Log</h3>
            <p className="text-gray-500 mt-2">Recent activities and interactions will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetail;
