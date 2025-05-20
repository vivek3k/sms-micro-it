
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Calendar, FileText, Users } from "lucide-react";

interface UserInfo {
  userType: "student" | "faculty" | "guest";
  username: string;
  isDemo?: boolean;
}

interface Course {
  id: number;
  code: string;
  name: string;
  instructor?: string;
  students?: number;
  schedule: string;
  progress?: number;
  assignments?: number;
  status: "active" | "completed";
}

// Function to get default course data based on user type
const getDefaultCourses = (userType: string): Course[] => {
  if (userType === "student") {
    return [
      {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        instructor: "Prof. Jane Smith",
        schedule: "Mon/Wed/Fri 10:00 AM - 11:30 AM",
        progress: 75,
        assignments: 5,
        status: "active"
      },
      {
        id: 2,
        code: "MATH201",
        name: "Calculus II",
        instructor: "Prof. Robert Johnson",
        schedule: "Tue/Thu 1:00 PM - 2:30 PM",
        progress: 60,
        assignments: 3,
        status: "active"
      },
      {
        id: 3,
        code: "PHYS201",
        name: "Physics for Engineers",
        instructor: "Dr. Michael Lee",
        schedule: "Mon/Wed 2:00 PM - 3:30 PM",
        progress: 45,
        assignments: 4,
        status: "active"
      },
      {
        id: 4,
        code: "ENG102",
        name: "English Literature",
        instructor: "Prof. Sarah Williams",
        schedule: "Tue/Thu 10:00 AM - 11:30 AM",
        progress: 80,
        assignments: 2,
        status: "active"
      },
      {
        id: 5,
        code: "CS100",
        name: "Introduction to Programming",
        instructor: "Prof. James Wilson",
        schedule: "Completed Fall 2023",
        progress: 100,
        assignments: 0,
        status: "completed"
      },
      {
        id: 6,
        code: "MATH101",
        name: "Calculus I",
        instructor: "Prof. Robert Johnson",
        schedule: "Completed Fall 2023",
        progress: 100,
        assignments: 0,
        status: "completed"
      }
    ];
  } else {
    return [
      {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        students: 28,
        schedule: "Mon/Wed/Fri 10:00 AM - 11:30 AM",
        assignments: 5,
        status: "active"
      },
      {
        id: 2,
        code: "CS202",
        name: "Data Structures and Algorithms",
        students: 22,
        schedule: "Tue/Thu 2:00 PM - 3:30 PM",
        assignments: 4,
        status: "active"
      },
      {
        id: 3,
        code: "CS301",
        name: "Database Systems",
        students: 18,
        schedule: "Mon/Wed 1:00 PM - 2:30 PM",
        assignments: 3,
        status: "active"
      },
      {
        id: 4,
        code: "CS100",
        name: "Introduction to Programming",
        students: 32,
        schedule: "Completed Fall 2023",
        assignments: 0,
        status: "completed"
      },
      {
        id: 5,
        code: "CS210",
        name: "Object-Oriented Programming",
        students: 25,
        schedule: "Completed Fall 2023",
        assignments: 0,
        status: "completed"
      }
    ];
  }
};

const StudentCourseView = ({ courses }: { courses: Course[] }) => {
  return (
    <Tabs defaultValue="active">
      <TabsList className="mb-6">
        <TabsTrigger value="active">Active Courses</TabsTrigger>
        <TabsTrigger value="completed">Completed Courses</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses
          .filter(course => course.status === "active")
          .map(course => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2">{course.code}</Badge>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.assignments} active assignments</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full">View Course</Button>
              </CardFooter>
            </Card>
          ))}
          
        {courses.filter(course => course.status === "active").length === 0 && (
          <div className="col-span-full text-center py-12">
            <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Active Courses</h3>
            <p className="text-sm text-muted-foreground mt-2">
              You're not enrolled in any active courses
            </p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="completed" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses
          .filter(course => course.status === "completed")
          .map(course => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2">{course.code}</Badge>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.schedule}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Final Grade</span>
                      <span>A</span>
                    </div>
                    <Progress value={100} className="bg-education-200" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Course History</Button>
              </CardFooter>
            </Card>
          ))}
          
        {courses.filter(course => course.status === "completed").length === 0 && (
          <div className="col-span-full text-center py-12">
            <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Completed Courses</h3>
            <p className="text-sm text-muted-foreground mt-2">
              You haven't completed any courses yet
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

const FacultyCourseView = ({ courses }: { courses: Course[] }) => {
  return (
    <Tabs defaultValue="active">
      <TabsList className="mb-6">
        <TabsTrigger value="active">Active Courses</TabsTrigger>
        <TabsTrigger value="completed">Archived Courses</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses
          .filter(course => course.status === "active")
          .map(course => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2">{course.code}</Badge>
                    <CardTitle>{course.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.students} enrolled students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.assignments} active assignments</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex space-x-2">
                <Button variant="default" className="w-full">Manage Course</Button>
              </CardFooter>
            </Card>
          ))}
          
        <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
          <Book className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Create New Course</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Start a new course for the upcoming semester
          </p>
          <Button>Add Course</Button>
        </Card>
        
        {courses.filter(course => course.status === "active").length === 0 && (
          <div className="col-span-full text-center py-12">
            <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Active Courses</h3>
            <p className="text-sm text-muted-foreground mt-2">
              You don't have any active courses. Create a new one to get started.
            </p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="completed" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses
          .filter(course => course.status === "completed")
          .map(course => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2">{course.code}</Badge>
                    <CardTitle>{course.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.students} students completed</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Course Archive</Button>
              </CardFooter>
            </Card>
          ))}
          
        {courses.filter(course => course.status === "completed").length === 0 && (
          <div className="col-span-full text-center py-12">
            <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Archived Courses</h3>
            <p className="text-sm text-muted-foreground mt-2">
              You don't have any archived courses yet
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

const Courses = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userType: "guest",
    username: "Guest"
  });
  
  const [courses, setCourses] = useState<Course[]>([]);
  
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
    
    // Only load demo data for demo users, otherwise check localStorage
    if (parsedUser.isDemo === true || 
        parsedUser.username === "Rahul Sharma" || 
        parsedUser.username === "Prof. Ananya Patel") {
      setCourses(getDefaultCourses(parsedUser.userType));
    } else {
      // For real users, check localStorage
      const storedCourses = localStorage.getItem(`courses_${parsedUser.username}`);
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses));
      } else {
        // Set empty array for new users
        setCourses([]);
      }
    }
  }, [navigate]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          {userInfo.userType === "student" 
            ? "View and manage your enrolled courses"
            : "Manage your teaching courses and create new ones"}
        </p>
      </div>
      
      {userInfo.userType === "student" ? (
        <StudentCourseView courses={courses} />
      ) : (
        <FacultyCourseView courses={courses} />
      )}
    </div>
  );
};

export default Courses;
