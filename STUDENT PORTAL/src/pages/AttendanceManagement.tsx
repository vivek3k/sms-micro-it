
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  userType: "student" | "faculty" | "guest";
  username: string;
  isDemo?: boolean;
}

interface ClassInfo {
  id: string;
  name: string;
  students: number;
  department: string;
}

interface StudentInfo {
  id: string;
  name: string;
  roll: string;
  attendance: number;
}

interface AttendanceUpload {
  id: number;
  class: string;
  date: string;
  time: string;
  uploadedBy: string;
  students: number;
}

// Demo data for faculty users
const demoClasses: ClassInfo[] = [
  { id: "CS101A", name: "Introduction to Programming (Section A)", students: 45, department: "Computer Science" },
  { id: "CS101B", name: "Introduction to Programming (Section B)", students: 40, department: "Computer Science" },
  { id: "CS201", name: "Data Structures", students: 38, department: "Computer Science" },
  { id: "CS301", name: "Database Management", students: 42, department: "Computer Science" },
];

const demoStudents: StudentInfo[] = [
  { id: "ST001", name: "Rahul Sharma", roll: "CS2101", attendance: 85 },
  { id: "ST002", name: "Priya Patel", roll: "CS2102", attendance: 92 },
  { id: "ST003", name: "Vikram Singh", roll: "CS2103", attendance: 78 },
  { id: "ST004", name: "Meera Joshi", roll: "CS2104", attendance: 95 },
  { id: "ST005", name: "Arjun Kumar", roll: "CS2105", attendance: 82 },
  { id: "ST006", name: "Ananya Reddy", roll: "CS2106", attendance: 90 },
  { id: "ST007", name: "Rohit Verma", roll: "CS2107", attendance: 76 },
  { id: "ST008", name: "Neha Gupta", roll: "CS2108", attendance: 88 },
  { id: "ST009", name: "Karan Malhotra", roll: "CS2109", attendance: 72 },
  { id: "ST010", name: "Divya Sharma", roll: "CS2110", attendance: 94 },
];

const demoUploads: AttendanceUpload[] = [
  { id: 1, class: "CS101A", date: "2023-05-15", time: "10:30 AM", uploadedBy: "You", students: 45 },
  { id: 2, class: "CS201", date: "2023-05-14", time: "2:15 PM", uploadedBy: "You", students: 38 },
  { id: 3, class: "CS101B", date: "2023-05-12", time: "11:45 AM", uploadedBy: "You", students: 40 },
];

const AttendanceManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userType: "guest",
    username: "Guest"
  });
  
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [recentUploads, setRecentUploads] = useState<AttendanceUpload[]>([]);
  
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
    
    // Load data based on user type
    if (parsedUser.isDemo) {
      // Use demo data for demo users
      setClasses(demoClasses);
      setStudents(demoStudents);
      setRecentUploads(demoUploads);
    } else {
      // For real users, check localStorage
      const storedClasses = localStorage.getItem(`faculty_classes_${parsedUser.username}`);
      const storedStudents = localStorage.getItem(`faculty_students_detailed_${parsedUser.username}`);
      const storedUploads = localStorage.getItem(`faculty_attendance_uploads_${parsedUser.username}`);
      
      setClasses(storedClasses ? JSON.parse(storedClasses) : []);
      setStudents(storedStudents ? JSON.parse(storedStudents) : []);
      setRecentUploads(storedUploads ? JSON.parse(storedUploads) : []);
    }
  }, [navigate]);
  
  const handleMarkAttendance = () => {
    if (!selectedClass || !selectedDate) {
      toast({
        title: "Missing Information",
        description: "Please select a class and date.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Attendance Marked",
      description: "Attendance has been recorded successfully.",
    });
  };
  
  const handleUploadAttendance = () => {
    toast({
      title: "Upload Successful",
      description: "Attendance data has been uploaded.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
        <p className="text-muted-foreground">
          Mark attendance and view student attendance records
        </p>
      </div>
      
      <Tabs defaultValue="mark">
        <TabsList>
          <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          <TabsTrigger value="upload">Upload Attendance</TabsTrigger>
          <TabsTrigger value="records">View Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mark" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mark Today's Attendance</CardTitle>
              <CardDescription>
                Select a class and mark attendance for students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="class">Select Class</Label>
                    <Select onValueChange={setSelectedClass}>
                      <SelectTrigger id="class">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={selectedDate} 
                      onChange={(e) => setSelectedDate(e.target.value)} 
                    />
                  </div>
                </div>
                
                {selectedClass && (
                  <div className="border rounded-md">
                    {students.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">Present</TableHead>
                            <TableHead>Roll No</TableHead>
                            <TableHead>Student Name</TableHead>
                            <TableHead className="text-right">Overall Attendance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>
                                <Checkbox id={`attendance-${student.id}`} defaultChecked />
                              </TableCell>
                              <TableCell>{student.roll}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell className="text-right">{student.attendance}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No students enrolled in this class
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button onClick={handleMarkAttendance}>Save Attendance</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Attendance</CardTitle>
              <CardDescription>
                Upload attendance data from a CSV or Excel file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="uploadClass">Select Class</Label>
                    <Select>
                      <SelectTrigger id="uploadClass">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="uploadDate">Date</Label>
                    <Input id="uploadDate" type="date" />
                  </div>
                </div>
                
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <UploadCloud className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Drag and drop your file here</p>
                      <p className="text-sm text-muted-foreground">
                        Support for CSV, XLS, or XLSX. Max file size 5MB
                      </p>
                    </div>
                    <Button variant="outline" className="mt-2">
                      Choose File
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleUploadAttendance}>Upload Attendance</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="records" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                View and manage all attendance records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recordClass">Class</Label>
                    <Select>
                      <SelectTrigger id="recordClass">
                        <SelectValue placeholder="All Classes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fromDate">From Date</Label>
                    <Input id="fromDate" type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="toDate">To Date</Label>
                    <Input id="toDate" type="date" />
                  </div>
                </div>
                
                {recentUploads.length > 0 ? (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Class</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentUploads.map((upload) => (
                          <TableRow key={upload.id}>
                            <TableCell>{upload.class}</TableCell>
                            <TableCell>{new Date(upload.date).toLocaleDateString('en-IN')}</TableCell>
                            <TableCell>{upload.time}</TableCell>
                            <TableCell>{upload.students}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" className="mr-2">View</Button>
                              <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No attendance records found
                  </div>
                )}
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Download Report</Button>
                  <Button>Generate Summary</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceManagement;
