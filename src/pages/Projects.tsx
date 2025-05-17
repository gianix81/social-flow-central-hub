
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Filter, 
  Grid3X3, 
  ListFilter, 
  Plus, 
  Search, 
  Users 
} from "lucide-react";

// Sample project data
const projects = [
  { 
    id: 101, 
    name: 'Website Relaunch', 
    client: 'TechBolt', 
    clientId: 1,
    status: 'In Progress', 
    deadline: 'Jun 30, 2025',
    completedTasks: 8,
    totalTasks: 15,
    team: ['JD', 'AK', 'MT']
  },
  { 
    id: 102, 
    name: 'Social Media Campaign', 
    client: 'TechBolt', 
    clientId: 1,
    status: 'Active', 
    deadline: 'Ongoing',
    completedTasks: 12,
    totalTasks: 20,
    team: ['JD', 'AK']
  },
  { 
    id: 201, 
    name: 'Summer Collection', 
    client: 'FashionStyle', 
    clientId: 2,
    status: 'Active', 
    deadline: 'Jun 15, 2025',
    completedTasks: 5,
    totalTasks: 12,
    team: ['AK', 'MT']
  },
  { 
    id: 202, 
    name: 'Influencer Program', 
    client: 'FashionStyle', 
    clientId: 2,
    status: 'In Progress', 
    deadline: 'Ongoing',
    completedTasks: 3,
    totalTasks: 8,
    team: ['JD']
  },
  { 
    id: 301, 
    name: 'Sustainability Campaign', 
    client: 'EcoGreen', 
    clientId: 3,
    status: 'Planning', 
    deadline: 'Jul 20, 2025',
    completedTasks: 2,
    totalTasks: 10,
    team: ['JD', 'MT']
  }
];

const Projects = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage and track all your client projects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search projects..."
            className="pl-9 h-9"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All Projects</option>
            <option value="active">Active Only</option>
            <option value="planning">Planning</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex bg-muted rounded-md p-1">
            <Button
              variant={viewMode === 'grid' ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode('list')}
            >
              <ListFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between">
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'Active' || project.status === 'In Progress' 
                        ? 'bg-green-50 text-green-700' 
                        : project.status === 'Planning' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </div>
                    <Link to={`/clients/${project.clientId}`} className="text-xs bg-brand-50 text-brand-800 px-2 py-1 rounded-full hover:bg-brand-100" onClick={e => e.stopPropagation()}>
                      {project.client}
                    </Link>
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-3">{project.name}</h3>
                  
                  <div className="mt-4">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full">
                      <div 
                        className="bg-brand h-1.5 rounded-full" 
                        style={{ width: `${(project.completedTasks / project.totalTasks) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>{project.completedTasks} of {project.totalTasks} tasks</span>
                      <span>{Math.round((project.completedTasks / project.totalTasks) * 100)}% complete</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">{project.deadline}</span>
                    </div>
                    <div className="flex">
                      {project.team.map((member, i) => (
                        <div 
                          key={i}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium -ml-1 first:ml-0 ring-2 ring-white"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          
          <Card className="border-dashed cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center h-[195px]">
            <div className="flex flex-col items-center justify-center text-center p-6">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Plus className="h-5 w-5 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium mt-3 text-gray-500">Create New Project</h3>
            </div>
          </Card>
        </div>
      ) : (
        <Card>
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500">
                  <th className="font-medium px-2 py-2">Project</th>
                  <th className="font-medium px-2 py-2">Client</th>
                  <th className="font-medium px-2 py-2">Status</th>
                  <th className="font-medium px-2 py-2">Deadline</th>
                  <th className="font-medium px-2 py-2">Progress</th>
                  <th className="font-medium px-2 py-2">Team</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr 
                    key={project.id} 
                    className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.location.href = `/projects/${project.id}`}
                  >
                    <td className="px-2 py-3 font-medium">{project.name}</td>
                    <td className="px-2 py-3">
                      <Link 
                        to={`/clients/${project.clientId}`} 
                        className="text-xs bg-brand-50 text-brand-800 px-2 py-1 rounded-full hover:bg-brand-100"
                        onClick={e => e.stopPropagation()}
                      >
                        {project.client}
                      </Link>
                    </td>
                    <td className="px-2 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        project.status === 'Active' || project.status === 'In Progress' 
                          ? 'bg-green-50 text-green-700' 
                          : project.status === 'Planning' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-sm">{project.deadline}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <div className="w-full max-w-[100px] bg-gray-100 h-1.5 rounded-full">
                        <div 
                          className="bg-brand h-1.5 rounded-full" 
                          style={{ width: `${(project.completedTasks / project.totalTasks) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round((project.completedTasks / project.totalTasks) * 100)}%
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex">
                        {project.team.map((member, i) => (
                          <div 
                            key={i}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium -ml-1 first:ml-0 ring-2 ring-white"
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Projects;
