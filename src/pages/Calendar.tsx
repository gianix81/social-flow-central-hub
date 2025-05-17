import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus 
} from "lucide-react";

const Calendar = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Schedule and manage your content calendar</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Today
          </Button>
          <div className="flex bg-muted rounded-md">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>May 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <div className="grid grid-cols-7 text-center border-b">
                <div className="p-2 font-medium border-r last:border-r-0">Sun</div>
                <div className="p-2 font-medium border-r last:border-r-0">Mon</div>
                <div className="p-2 font-medium border-r last:border-r-0">Tue</div>
                <div className="p-2 font-medium border-r last:border-r-0">Wed</div>
                <div className="p-2 font-medium border-r last:border-r-0">Thu</div>
                <div className="p-2 font-medium border-r last:border-r-0">Fri</div>
                <div className="p-2 font-medium border-r last:border-r-0">Sat</div>
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 min-h-[600px]">
                {/* First week with some April days */}
                {[...Array(7)].map((_, i) => {
                  const day = i - 3;
                  const isToday = day === 15;
                  const isPrevMonth = day <= 0;
                  const dayNum = isPrevMonth ? 30 + day : day;
                  
                  return (
                    <div key={`week1-${i}`} className={`min-h-[100px] p-1 border-r border-b last:border-r-0 ${
                      isPrevMonth ? 'bg-gray-50 text-gray-400' : ''
                    } ${isToday ? 'bg-brand-50' : ''}`}>
                      <div className="flex justify-between p-1">
                        <span className={`text-sm ${isToday ? 'font-bold text-brand' : ''}`}>{dayNum}</span>
                        {!isPrevMonth && i === 4 && (
                          <span className="text-xs text-white bg-brand rounded-full px-1.5">3</span>
                        )}
                      </div>
                      
                      {!isPrevMonth && i === 4 && (
                        <div className="mt-1 space-y-1">
                          <div className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate">9:00 AM - Client Call</div>
                          <div className="text-xs p-1 rounded bg-green-100 text-green-800 truncate">2:00 PM - Post Draft Due</div>
                          <div className="text-xs p-1 rounded bg-purple-100 text-purple-800 truncate">4:30 PM - Team Meeting</div>
                        </div>
                      )}
                      
                      {!isPrevMonth && i === 2 && (
                        <div className="mt-1">
                          <div className="text-xs p-1 rounded bg-amber-100 text-amber-800 truncate">11:30 AM - Content Review</div>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Rest of the calendar */}
                {[...Array(28)].map((_, i) => {
                  const day = i + 5;
                  const isToday = day === 15;
                  const isNextMonth = day > 31;
                  const dayNum = isNextMonth ? day - 31 : day;
                  
                  return (
                    <div key={`rest-${i}`} className={`min-h-[100px] p-1 border-r border-b last:border-r-0 ${
                      isNextMonth ? 'bg-gray-50 text-gray-400' : ''
                    } ${isToday ? 'bg-brand-50' : ''}`}>
                      <div className="flex justify-between p-1">
                        <span className={`text-sm ${isToday ? 'font-bold text-brand' : ''}`}>{dayNum}</span>
                        {day === 10 && (
                          <span className="text-xs text-white bg-red-500 rounded-full px-1.5">1</span>
                        )}
                        {day === 20 && (
                          <span className="text-xs text-white bg-brand rounded-full px-1.5">2</span>
                        )}
                      </div>
                      
                      {day === 10 && (
                        <div className="mt-1">
                          <div className="text-xs p-1 rounded bg-red-100 text-red-800 truncate">DEADLINE - Campaign Launch</div>
                        </div>
                      )}
                      
                      {day === 15 && (
                        <div className="mt-1 space-y-1">
                          <div className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate">10:00 AM - Strategy Meeting</div>
                          <div className="text-xs p-1 rounded bg-green-100 text-green-800 truncate">1:00 PM - Content Planning</div>
                        </div>
                      )}
                      
                      {day === 20 && (
                        <div className="mt-1 space-y-1">
                          <div className="text-xs p-1 rounded bg-purple-100 text-purple-800 truncate">2:30 PM - Client Presentation</div>
                          <div className="text-xs p-1 rounded bg-amber-100 text-amber-800 truncate">4:00 PM - Social Media Audit</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
