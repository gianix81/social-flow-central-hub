
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, CheckSquare, Edit } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch project data based on the ID
  const project = {
    id: parseInt(id || "0"),
    name: `Project ${id}`,
    client: id && parseInt(id) > 200 ? "EcoGreen" : id && parseInt(id) > 100 ? "TechBolt" : "FashionStyle",
    clientId: id && parseInt(id) > 200 ? 3 : id && parseInt(id) > 100 ? 1 : 2,
    status: "In Progress",
    description: "This is a sample project description. In a real application, this would contain detailed information about the project scope, goals, and other relevant details.",
    startDate: "May 1, 2025",
    deadline: "Jun 30, 2025"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/projects">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex items-center gap-2">
              <Link 
                to={`/clients/${project.clientId}`}
                className="text-brand hover:text-brand-dark text-sm"
              >
                {project.client}
              </Link>
              <span className="text-gray-400">•</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                project.status === 'Active' || project.status === 'In Progress' 
                  ? 'bg-green-50 text-green-700' 
                  : project.status === 'Planning' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Overview</TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Tasks</TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Content</TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-brand-50 data-[state=active]:text-brand">Team</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
                      <p className="mt-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{project.startDate}</span>
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Deadline</h4>
                      <p className="mt-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{project.deadline}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 mt-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">Project Progress</h4>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                      <div className="bg-brand h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>45% complete</span>
                      <span>9 of 20 tasks completed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <CheckSquare className="h-4 w-4 mt-0.5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium">Create social media graphics</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-yellow-50 text-yellow-800 px-2 py-0.5 rounded-full">In Progress</span>
                          <span className="text-xs text-gray-500">Due May 25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <CheckSquare className="h-4 w-4 mt-0.5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium">Write blog post draft</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-green-50 text-green-800 px-2 py-0.5 rounded-full">Completed</span>
                          <span className="text-xs text-gray-500">May 18</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <CheckSquare className="h-4 w-4 mt-0.5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium">Schedule client review meeting</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full">Pending</span>
                          <span className="text-xs text-gray-500">Due May 30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-2">View All Tasks</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Tasks & To-Dos</h3>
            <p className="text-gray-500 mt-2">Detailed task management interface will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="content">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Content Management</h3>
            <p className="text-gray-500 mt-2">Project content and assets will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="team">
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium">Team Management</h3>
            <p className="text-gray-500 mt-2">Team members and responsibilities will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
