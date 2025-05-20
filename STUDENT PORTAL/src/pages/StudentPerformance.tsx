
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";

interface UserInfo {
  userType: "student" | "faculty" | "guest";
  username: string;
  isDemo?: boolean;
}

const StudentPerformance = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userType: "guest",
    username: "Guest"
  });
  
  // Demo classes taught by faculty
  const demoClasses = [
    { id: "CS101A", name: "Introduction to Programming (Section A)" },
    { id: "CS101B", name: "Introduction to Programming (Section B)" },
    { id: "CS201", name: "Data Structures" },
    { id: "CS301", name: "Database Management" },
  ];
  
  // Demo students with Indian names
  const demoStudents = [
    { id: "ST001", name: "Aryan Sharma", roll: "CS2101", overall: 82 },
    { id: "ST002", name: "Ananya Patel", roll: "CS2102", overall: 91 },
    { id: "ST003", name: "Vikram Singh", roll: "CS2103", overall: 78 },
    { id: "ST004", name: "Ishita Joshi", roll: "CS2104", overall: 95 },
    { id: "ST005", name: "Arjun Kumar", roll: "CS2105", overall: 84 },
    { id: "ST006", name: "Shreya Reddy", roll: "CS2106", overall: 88 },
    { id: "ST007", name: "Rohan Verma", roll: "CS2107", overall: 79 },
    { id: "ST008", name: "Neha Gupta", roll: "CS2108", overall: 86 },
    { id: "ST009", name: "Karan Malhotra", roll: "CS2109", overall: 75 },
    { id: "ST010", name: "Divya Sharma", roll: "CS2110", overall: 93 },
  ];
  
  // Demo performance data for class
  const demoClassPerformance = [
    { name: 'Quiz 1', average: 72, max: 95, min: 45 },
    { name: 'Mid-Term', average: 68, max: 92, min: 40 },
    { name: 'Quiz 2', average: 78, max: 98, min: 52 },
    { name: 'Project', average: 85, max: 100, min: 65 },
    { name: 'Final Exam', average: 76, max: 94, min: 48 },
  ];
  
  // Demo assignments
  const demoAssignments = [
    { id: 1, title: "Assignment 1: Introduction to Variables", dueDate: "2023-08-15", submitted: 42, total: 45 },
    { id: 2, title: "Assignment 2: Control Structures", dueDate: "2023-08-22", submitted: 40, total: 45 },
    { id: 3, title: "Assignment 3: Functions", dueDate: "2023-08-29", submitted: 38, total: 45 },
    { id: 4, title: "Assignment 4: Arrays and Lists", dueDate: "2023-09-05", submitted: 35, total: 45 },
  ];
  
  // Demo student assessments
  const demoStudentAssessments = [
    { id: 1, name: "Quiz 1", marks: 18, total: 20, date: "2023-07-10" },
    { id: 2, name: "Assignment 1", marks: 23, total: 25, date: "2023-07-15" },
    { id: 3, name: "Mid-Term", marks: 35, total: 50, date: "2023-08-05" },
    { id: 4, name: "Quiz 2", marks: 17, total: 20, date: "2023-08-25" },
    { id: 5, name: "Assignment 2", marks: 22, total: 25, date: "2023-09-01" },
  ];

  // State for actual data
  const [classes, setClasses] = useState<{ id: string, name: string }[]>([]);
  const [students, setStudents] = useState<{ id: string, name: string, roll: string, overall: number }[]>([]);
  const [classPerformance, setClassPerformance] = useState<{ name: string, average: number, max: number, min: number }[]>([]);
  const [assignments, setAssignments] = useState<{ id: number, title: string, dueDate: string, submitted: number, total: number }[]>([]);
  const [studentAssessments, setStudentAssessments] = useState<{ id: number, name: string, marks: number, total: number, date: string }[]>([]);
  
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
      setClassPerformance(demoClassPerformance);
      setAssignments(demoAssignments);
      setStudentAssessments(demoStudentAssessments);
    } else {
      // For real users, check localStorage
      const storedClasses = localStorage.getItem(`faculty_classes_${parsedUser.username}`);
      const storedStudents = localStorage.getItem(`faculty_students_detailed_${parsedUser.username}`);
      const storedPerformance = localStorage.getItem(`faculty_performance_${parsedUser.username}`);
      const storedAssignments = localStorage.getItem(`faculty_assignments_${parsedUser.username}`);
      const storedAssessments = localStorage.getItem(`faculty_assessments_${parsedUser.username}`);
      
      setClasses(storedClasses ? JSON.parse(storedClasses) : []);
      setStudents(storedStudents ? JSON.parse(storedStudents) : []);
      setClassPerformance(storedPerformance ? JSON.parse(storedPerformance) : []);
      setAssignments(storedAssignments ? JSON.parse(storedAssignments) : []);
      setStudentAssessments(storedAssessments ? JSON.parse(storedAssessments) : []);
    }
  }, [navigate]);
  
  const handleSendFeedback = () => {
    toast({
      title: "Feedback Sent",
      description: "Your feedback has been sent to the student.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Performance</h1>
        <p className="text-muted-foreground">
          Monitor and evaluate student performance in your classes
        </p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Class Overview</TabsTrigger>
          <TabsTrigger value="individual">Individual Assessment</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>
                Overall performance metrics for your classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="overviewClass">Select Class</Label>
                    <Select>
                      <SelectTrigger id="overviewClass">
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
                </div>
                
                {classPerformance.length > 0 ? (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={classPerformance}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" fill="#8884d8" name="Class Average" />
                        <Bar dataKey="max" fill="#82ca9d" name="Highest Score" />
                        <Bar dataKey="min" fill="#ffc658" name="Lowest Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No performance data available
                  </div>
                )}
                
                {students.length > 0 ? (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Roll No</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Overall Performance</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.roll}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={student.overall} className="h-2" />
                                <span className="text-sm font-medium">{student.overall}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline" onClick={() => setSelectedStudent(student.id)}>
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No student data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="individual" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Student Assessment</CardTitle>
              <CardDescription>
                View and assess individual student performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="individualClass">Select Class</Label>
                    <Select>
                      <SelectTrigger id="individualClass">
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
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="studentSearch">Search Student</Label>
                    <Input id="studentSearch" placeholder="Search by name or roll number" />
                  </div>
                </div>
                
                {selectedStudent && students.length > 0 && (
                  <div className="space-y-6 border rounded-md p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {students.find(s => s.id === selectedStudent)?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Roll No: {students.find(s => s.id === selectedStudent)?.roll}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">Overall Performance</span>
                        <div className="flex items-center justify-end space-x-2">
                          <Progress value={students.find(s => s.id === selectedStudent)?.overall} className="h-2 w-40" />
                          <span className="text-sm font-medium">
                            {students.find(s => s.id === selectedStudent)?.overall}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {studentAssessments.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Assessment</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Marks</TableHead>
                            <TableHead className="text-right">Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentAssessments.map((assessment) => (
                            <TableRow key={assessment.id}>
                              <TableCell>{assessment.name}</TableCell>
                              <TableCell>{new Date(assessment.date).toLocaleDateString('en-IN')}</TableCell>
                              <TableCell>{assessment.marks}/{assessment.total}</TableCell>
                              <TableCell className="text-right">
                                {((assessment.marks / assessment.total) * 100).toFixed(2)}%
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        No assessment data available
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Provide Feedback</h4>
                      <textarea 
                        className="flex w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Write feedback for the student..."
                      ></textarea>
                      <Button onClick={handleSendFeedback}>Send Feedback</Button>
                    </div>
                  </div>
                )}
                
                {!selectedStudent && (
                  <div className="text-center py-6 text-muted-foreground">
                    Select a student to view their performance details
                  </div>
                )}
                
                {selectedStudent && students.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    No student data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Management</CardTitle>
              <CardDescription>
                Manage assignments and track submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="assignmentClass">Select Class</Label>
                    <Select>
                      <SelectTrigger id="assignmentClass">
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
                  
                  <div className="flex items-end">
                    <Button>Create New Assignment</Button>
                  </div>
                </div>
                
                {assignments.length > 0 ? (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Assignment</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Submissions</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assignments.map((assignment) => (
                          <TableRow key={assignment.id}>
                            <TableCell>{assignment.title}</TableCell>
                            <TableCell>{new Date(assignment.dueDate).toLocaleDateString('en-IN')}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress 
                                  value={(assignment.submitted / assignment.total) * 100} 
                                  className="h-2" 
                                />
                                <span className="text-sm font-medium">
                                  {assignment.submitted}/{assignment.total}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline" className="mr-2">View</Button>
                              <Button size="sm" variant="outline">Grade</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No assignments to display
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentPerformance;
