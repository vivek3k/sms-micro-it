
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UserInfo {
  userType: "student" | "faculty" | "guest";
  username: string;
  isDemo?: boolean;
}

interface ScheduleEvent {
  id: number;
  title: string;
  type: "class" | "exam" | "assignment" | "meeting" | "office_hours";
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description?: string;
  course?: string;
}

const studentEvents: ScheduleEvent[] = [
  {
    id: 1,
    title: "Computer Science 101",
    type: "class",
    date: "2025-05-17",
    startTime: "10:00",
    endTime: "11:30",
    location: "Science Building, Room 305",
    course: "CS101"
  },
  {
    id: 2,
    title: "Calculus II",
    type: "class",
    date: "2025-05-17",
    startTime: "13:00",
    endTime: "14:30",
    location: "Math Building, Room 201",
    course: "MATH201"
  },
  {
    id: 3,
    title: "Algorithm Analysis Paper Due",
    type: "assignment",
    date: "2025-05-25",
    startTime: "23:59",
    endTime: "23:59",
    location: "Online Submission",
    description: "Final day to submit your algorithm analysis paper",
    course: "CS101"
  },
  {
    id: 4,
    title: "Physics Midterm Exam",
    type: "exam",
    date: "2025-05-22",
    startTime: "14:00",
    endTime: "16:00",
    location: "Science Building, Room 401",
    description: "Bring calculators and formula sheets",
    course: "PHYS201"
  },
  {
    id: 5,
    title: "Academic Advising Meeting",
    type: "meeting",
    date: "2025-05-20",
    startTime: "11:00",
    endTime: "11:30",
    location: "Administration Building, Room 102",
    description: "Meeting with Prof. Johnson to discuss next semester courses"
  },
  {
    id: 6,
    title: "English Literature",
    type: "class",
    date: "2025-05-17",
    startTime: "15:00",
    endTime: "16:30",
    location: "Humanities Building, Room 210",
    course: "ENG102"
  }
];

const facultyEvents: ScheduleEvent[] = [
  {
    id: 1,
    title: "Computer Science 101",
    type: "class",
    date: "2025-05-17",
    startTime: "10:00",
    endTime: "11:30",
    location: "Science Building, Room 305",
    course: "CS101"
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    type: "class",
    date: "2025-05-17",
    startTime: "14:00",
    endTime: "15:30",
    location: "Science Building, Room 310",
    course: "CS202"
  },
  {
    id: 3,
    title: "Department Meeting",
    type: "meeting",
    date: "2025-05-19",
    startTime: "13:00",
    endTime: "14:00",
    location: "Admin Building, Conference Room 2",
    description: "Weekly department meeting"
  },
  {
    id: 4,
    title: "Office Hours",
    type: "office_hours",
    date: "2025-05-18",
    startTime: "13:00",
    endTime: "15:00",
    location: "Science Building, Room 315",
    description: "Office hours for students"
  },
  {
    id: 5,
    title: "CS202 Midterm",
    type: "exam",
    date: "2025-05-18",
    startTime: "10:00",
    endTime: "12:00",
    location: "Science Building, Room 401",
    course: "CS202"
  },
  {
    id: 6,
    title: "Database Systems",
    type: "class",
    date: "2025-05-17",
    startTime: "16:00",
    endTime: "17:30",
    location: "Science Building, Room 308",
    course: "CS301"
  }
];

// Get days of the current week
function getCurrentWeekDays() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
  
  const days = [];
  // Calculate start of week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay);
  
  // Generate array of days for the week
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }
  
  return days;
}

// Format date to YYYY-MM-DD
function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

function getEventTypeColor(type: string): string {
  switch (type) {
    case "class":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "exam":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "assignment":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "meeting":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "office_hours":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
}

const formatEventTime = (startTime: string, endTime: string) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const m = parseInt(minutes);
    
    return `${h > 12 ? h - 12 : h}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  };
  
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

const Schedule = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userType: "guest",
    username: "Guest"
  });
  
  const [weekDays, setWeekDays] = useState(getCurrentWeekDays());
  const [selectedDate, setSelectedDate] = useState(formatDateToYYYYMMDD(new Date()));
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('portalUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUserInfo({
      userType: parsedUser.userType,
      username: parsedUser.username,
      isDemo: parsedUser.isDemo
    });
    
    // Only load demo events for demo users
    if (parsedUser.isDemo) {
      if (parsedUser.userType === 'student') {
        setEvents(studentEvents);
      } else {
        setEvents(facultyEvents);
      }
    } else {
      // Check for user-specific events in localStorage
      const userEvents = localStorage.getItem(`events_${parsedUser.username}`);
      if (userEvents) {
        setEvents(JSON.parse(userEvents));
      } else {
        // No events for new users
        setEvents([]);
      }
    }
  }, [navigate]);
  
  // Filter events for selected date
  const filteredEvents = events.filter(event => event.date === selectedDate);
  
  // Sort events by start time
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });
  
  const handlePreviousWeek = () => {
    const newWeekDays = weekDays.map(day => {
      const newDay = new Date(day);
      newDay.setDate(day.getDate() - 7);
      return newDay;
    });
    
    setWeekDays(newWeekDays);
  };
  
  const handleNextWeek = () => {
    const newWeekDays = weekDays.map(day => {
      const newDay = new Date(day);
      newDay.setDate(day.getDate() + 7);
      return newDay;
    });
    
    setWeekDays(newWeekDays);
  };
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(formatDateToYYYYMMDD(date));
  };
  
  const today = new Date();
  const formattedToday = formatDateToYYYYMMDD(today);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">
          {userInfo.userType === "student" 
            ? "View your class schedule and upcoming events"
            : "Manage your teaching schedule and appointments"}
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handlePreviousWeek}>Previous Week</Button>
        <h2 className="text-lg font-medium">
          {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </h2>
        <Button variant="outline" onClick={handleNextWeek}>Next Week</Button>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const formattedDate = formatDateToYYYYMMDD(day);
          const isToday = formattedDate === formattedToday;
          const isSelected = formattedDate === selectedDate;
          
          // Count events for this day
          const dayEvents = events.filter(event => event.date === formattedDate);
          
          return (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "h-auto flex flex-col p-3",
                isToday && "border-education-500",
                isSelected && "bg-education-100 dark:bg-education-900"
              )}
              onClick={() => handleDateClick(day)}
            >
              <span className="text-xs font-medium">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span className={cn(
                "text-lg font-bold",
                isToday && "text-education-600"
              )}>
                {day.getDate()}
              </span>
              {dayEvents.length > 0 && (
                <Badge className="mt-1 text-xs">{dayEvents.length} events</Badge>
              )}
            </Button>
          );
        })}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sortedEvents.length > 0 ? (
            <div className="space-y-4">
              {sortedEvents.map(event => (
                <div key={event.id} className="flex border rounded-lg overflow-hidden">
                  <div className="w-2 h-auto bg-education-500" />
                  <div className="p-4 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        {event.course && (
                          <p className="text-sm text-muted-foreground">{event.course}</p>
                        )}
                      </div>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type.replace('_', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {formatEventTime(event.startTime, event.endTime)}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      
                      {event.description && (
                        <p className="text-sm mt-2 text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <CalendarIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No events scheduled</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You don't have any events scheduled for this day.
              </p>
              <Button className="mt-4">
                {userInfo.userType === "faculty" ? "Add Event" : "View Full Calendar"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;
