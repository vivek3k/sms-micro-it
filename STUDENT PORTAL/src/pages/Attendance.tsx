
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  userType: "student" | "faculty" | "guest";
  username: string;
  isDemo?: boolean;
}

interface CourseAttendance {
  id: string;
  name: string;
  attendance: number;
  classes: number;
  present: number;
}

interface AttendanceRecord {
  date: string;
  course: string;
  status: "Present" | "Absent";
}

// Demo data for mock users
const demoCourses: CourseAttendance[] = [
  { id: "CS101", name: "Introduction to Programming", attendance: 85, classes: 24, present: 20 },
  { id: "CS201", name: "Data Structures", attendance: 92, classes: 26, present: 24 },
  { id: "CS301", name: "Database Management", attendance: 76, classes: 21, present: 16 },
  { id: "CS401", name: "Computer Networks", attendance: 88, classes: 23, present: 20 },
  { id: "MA101", name: "Engineering Mathematics", attendance: 72, classes: 25, present: 18 },
];

const demoAttendanceRecords: AttendanceRecord[] = [
  { date: "2023-05-15", course: "CS101", status: "Present" },
  { date: "2023-05-16", course: "CS201", status: "Present" },
  { date: "2023-05-16", course: "CS301", status: "Absent" },
  { date: "2023-05-17", course: "CS401", status: "Present" },
  { date: "2023-05-17", course: "MA101", status: "Present" },
  { date: "2023-05-18", course: "CS101", status: "Present" },
  { date: "2023-05-18", course: "CS201", status: "Present" },
  { date: "2023-05-19", course: "CS301", status: "Present" },
  { date: "2023-05-19", course: "CS401", status: "Absent" },
  { date: "2023-05-20", course: "MA101", status: "Present" },
];

const Attendance = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userType: "guest",
    username: "Guest"
  });
  
  const [courses, setCourses] = useState<CourseAttendance[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  
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
    
    // Only load demo data for demo users
    if (parsedUser.isDemo) {
      setCourses(demoCourses);
      setAttendanceRecords(demoAttendanceRecords);
    } else {
      // For real users, check localStorage
      const storedCourses = localStorage.getItem(`attendance_courses_${parsedUser.username}`);
      const storedRecords = localStorage.getItem(`attendance_records_${parsedUser.username}`);
      
      setCourses(storedCourses ? JSON.parse(storedCourses) : []);
      setAttendanceRecords(storedRecords ? JSON.parse(storedRecords) : []);
    }
    
    // If not student, redirect to dashboard
    if (parsedUser.userType !== "student") {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const handleUploadAttendance = () => {
    toast({
      title: "Upload Successful",
      description: "Your attendance document has been uploaded for verification.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">
          Monitor your course attendance and upload medical certificates
        </p>
      </div>
      
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">Detailed Records</TabsTrigger>
          <TabsTrigger value="upload">Upload Certificate</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
              <CardDescription>
                Your current attendance percentage across all courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {courses.length > 0 ? (
                <div className="space-y-6">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-sm text-muted-foreground">{course.id}</p>
                        </div>
                        <p className="font-medium">{course.attendance}%</p>
                      </div>
                      <Progress value={course.attendance} />
                      <p className="text-sm text-muted-foreground">
                        Present: {course.present} / Total: {course.classes} classes
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No attendance data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="records" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Attendance Records</CardTitle>
              <CardDescription>
                Day-wise attendance records for all courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {attendanceRecords.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceRecords.map((record, index) => {
                      const course = courses.find(c => c.id === record.course);
                      return (
                        <TableRow key={index}>
                          <TableCell>{new Date(record.date).toLocaleDateString('en-IN')}</TableCell>
                          <TableCell>{record.course}</TableCell>
                          <TableCell>{course?.name || ""}</TableCell>
                          <TableCell>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              record.status === "Present" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            }`}>
                              {record.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No attendance records available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Medical Certificate</CardTitle>
              <CardDescription>
                Upload medical certificates for attendance consideration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="certificate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Medical Certificate
                  </label>
                  <input
                    id="certificate"
                    type="file"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload PDF, JPG or PNG file (max 5MB)
                  </p>
                </div>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="dateRange" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Absence Period
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fromDate" className="text-xs text-muted-foreground">From</label>
                      <Input id="fromDate" type="date" />
                    </div>
                    <div>
                      <label htmlFor="toDate" className="text-xs text-muted-foreground">To</label>
                      <Input id="toDate" type="date" />
                    </div>
                  </div>
                </div>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="reason" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Reason for Absence
                  </label>
                  <textarea 
                    id="reason" 
                    rows={3} 
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Explain the reason for your absence"
                  ></textarea>
                </div>
                
                <Button onClick={handleUploadAttendance}>Upload Certificate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Input = ({ id, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    id={id}
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  />
);

export default Attendance;
