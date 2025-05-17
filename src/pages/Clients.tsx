
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react";

// Sample client data
const clients = [
  { id: 1, name: 'TechBolt', industry: 'Technology', projects: 3, active: true },
  { id: 2, name: 'FashionStyle', industry: 'Fashion & Retail', projects: 2, active: true },
  { id: 3, name: 'EcoGreen', industry: 'Sustainability', projects: 1, active: true },
  { id: 4, name: 'HealthPlus', industry: 'Healthcare', projects: 2, active: false },
  { id: 5, name: 'FoodDelights', industry: 'Food & Beverage', projects: 0, active: false },
];

const Clients = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600">Manage your clients and their projects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search clients..."
            className="pl-9 h-9"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All Clients</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Link to={`/clients/${client.id}`} key={client.id}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
                    <span className="font-semibold text-brand">{client.name.charAt(0)}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="text-lg font-semibold mt-3">{client.name}</h3>
                <p className="text-sm text-gray-500">{client.industry}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm">
                    <span className="font-medium">{client.projects}</span>
                    <span className="text-gray-500 ml-1">Projects</span>
                  </div>
                  <div className={`px-2 py-0.5 text-xs rounded-full ${client.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {client.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        <Card className="border-dashed cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center h-[164px]">
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="h-5 w-5 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mt-3 text-gray-500">Add New Client</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Clients;
