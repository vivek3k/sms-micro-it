
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, User, Mail, GraduationCap, BarChart, ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  userType: "student" | "faculty" | "guest";
  username: string;
  isDemo?: boolean;
}

interface Student {
  id: string;
  name: string;
  email: string;
  program: string;
  gpa: number;
  year: string;
  status: "active" | "probation" | "honors";
  courses: string[];
}

// Demo data for faculty accounts
const demoStudentData: Student[] = [
  {
    id: "S1001",
    name: "Rahul Sharma",
    email: "rahul.sharma@university.edu",
    program: "Computer Science",
    gpa: 3.8,
    year: "Junior",
    status: "honors",
    courses: ["CS101", "CS202", "MATH201"]
  },
  {
    id: "S1002",
    name: "Priya Patel",
    email: "priya.patel@university.edu",
    program: "Computer Science",
    gpa: 3.9,
    year: "Senior",
    status: "honors",
    courses: ["CS202", "CS301"]
  },
  {
    id: "S1003",
    name: "Vikram Singh",
    email: "vikram.singh@university.edu",
    program: "Computer Science",
    gpa: 2.7,
    year: "Sophomore",
    status: "probation",
    courses: ["CS101", "MATH201"]
  },
  {
    id: "S1004",
    name: "Anjali Gupta",
    email: "anjali.gupta@university.edu",
    program: "Computer Science",
    gpa: 3.5,
    year: "Junior",
    status: "active",
    courses: ["CS101", "CS301"]
  },
  {
    id: "S1005",
    name: "Raj Kumar",
    email: "raj.kumar@university.edu",
    program: "Computer Science",
    gpa: 3.2,
    year: "Senior",
    status: "active",
    courses: ["CS202", "CS301"]
  },
  {
    id: "S1006",
    name: "Meera Joshi",
    email: "meera.joshi@university.edu",
    program: "Computer Science",
    gpa: 4.0,
    year: "Junior",
    status: "honors",
    courses: ["CS101", "CS202", "CS301", "MATH201"]
  },
  {
    id: "S1007",
    name: "Arjun Nair",
    email: "arjun.nair@university.edu",
    program: "Computer Science",
    gpa: 2.9,
    year: "Sophomore",
    status: "active",
    courses: ["CS101", "MATH201"]
  },
  {
    id: "S1008",
    name: "Ananya Reddy",
    email: "ananya.reddy@university.edu",
    program: "Computer Science",
    gpa: 3.7,
    year: "Senior",
    status: "honors",
    courses: ["CS202", "CS301"]
  }
];

function getStatusColor(status: string): string {
  switch (status) {
    case "honors":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "probation":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  }
}

const StudentsByClass = ({ studentData }: { studentData: Student[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof Student>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Filter students based on search query
  const filteredStudents = studentData.filter(student => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.id.toLowerCase().includes(query)
    );
  });
  
  // Sort students based on selected field and direction
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  
  const handleSort = (field: keyof Student) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students by name, email, or ID..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {studentData.length > 0 ? (
        <div className="rounded-md border">
          <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name 
              {sortField === "name" && (
                <ArrowUpDown className="ml-1 h-4 w-4" />
              )}
            </div>
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("year")}
            >
              Year 
              {sortField === "year" && (
                <ArrowUpDown className="ml-1 h-4 w-4" />
              )}
            </div>
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("gpa")}
            >
              GPA 
              {sortField === "gpa" && (
                <ArrowUpDown className="ml-1 h-4 w-4" />
              )}
            </div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          
          {sortedStudents.map((student) => (
            <div 
              key={student.id}
              className="grid grid-cols-5 items-center p-3 text-sm border-t"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-xs text-muted-foreground">{student.id}</div>
                </div>
              </div>
              <div>{student.year}</div>
              <div className="font-medium">{student.gpa.toFixed(1)}</div>
              <div>
                <Badge className={getStatusColor(student.status)}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">View Details</Button>
                <Button size="sm">Contact</Button>
              </div>
            </div>
          ))}
          
          {sortedStudents.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No students match your search criteria
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          No student data available
        </div>
      )}
    </div>
  );
};

const StudentStatistics = ({ studentData }: { studentData: Student[] }) => {
  // If no student data, show empty state
  if (studentData.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No Student Data</h3>
        <p className="text-sm text-muted-foreground mt-2">
          There are no students enrolled in your courses yet.
        </p>
      </div>
    );
  }

  // Calculate statistics
  const totalStudents = studentData.length;
  const avgGpa = (studentData.reduce((sum, student) => sum + student.gpa, 0) / totalStudents).toFixed(2);
  const honorsCount = studentData.filter(s => s.status === "honors").length;
  const probationCount = studentData.filter(s => s.status === "probation").length;
  
  // Course distribution
  const courseMap = new Map<string, number>();
  studentData.forEach(student => {
    student.courses.forEach(course => {
      courseMap.set(course, (courseMap.get(course) || 0) + 1);
    });
  });
  
  const courseCounts = Array.from(courseMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-muted-foreground">
            Enrolled in your courses
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgGpa}</div>
          <p className="text-xs text-muted-foreground">
            Across all enrolled students
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Honors Students</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{honorsCount}</div>
          <p className="text-xs text-muted-foreground">
            {((honorsCount / totalStudents) * 100).toFixed(0)}% of total
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Academic Probation</CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{probationCount}</div>
          <p className="text-xs text-muted-foreground">
            {((probationCount / totalStudents) * 100).toFixed(0)}% of total
          </p>
        </CardContent>
      </Card>
      
      {courseCounts.length > 0 && (
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Course Enrollment</CardTitle>
            <CardDescription>
              Number of students enrolled in each course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseCounts.map(([course, count]) => (
                <div key={course} className="flex items-center">
                  <div className="w-40 text-sm font-medium">{course}</div>
                  <div className="flex-1">
                    <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-education-500"
                        style={{ width: `${(count / totalStudents) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-muted-foreground">
                    {count} students ({((count / totalStudents) * 100).toFixed(0)}%)
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const Students = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userType: "guest",
    username: "Guest"
  });
  
  const [studentData, setStudentData] = useState<Student[]>([]);
  
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
    
    // If not faculty, redirect to dashboard
    if (parsedUser.userType !== "faculty") {
      navigate('/dashboard');
      return;
    }
    
    // Load student data based on user type
    if (parsedUser.isDemo) {
      // Use demo data for demo users
      setStudentData(demoStudentData);
    } else {
      // For real users, check localStorage
      const storedStudents = localStorage.getItem(`faculty_students_${parsedUser.username}`);
      setStudentData(storedStudents ? JSON.parse(storedStudents) : []);
    }
  }, [navigate]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground">
          Manage and view students enrolled in your courses
        </p>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList className="mb-6">
          <TabsTrigger value="list">Student List</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <StudentsByClass studentData={studentData} />
        </TabsContent>
        
        <TabsContent value="stats">
          <StudentStatistics studentData={studentData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Students;
