import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlarmClock, Calendar, CheckCircle2, Clock, FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface UserInfo {
  userType: "student" | "faculty" | "guest";
  username: string;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "completed" | "past" | "active";
  description: string;
  submissions?: number;
  totalStudents?: number;
  uploadedFile?: string;
  submissionDate?: string;
}

// Function to generate default assignments based on user type and name
const getDefaultAssignments = (userType: string, username: string): Assignment[] => {
  if (username === "Rahul Sharma" && userType === "student") {
    return [
      {
        id: 1,
        title: "Algorithm Analysis Paper",
        course: "CS101 - Introduction to Computer Science",
        dueDate: "2025-05-25T23:59:59",
        status: "pending",
        description: "Write a 5-page paper on the time complexity analysis of sorting algorithms.",
      },
      {
        id: 2,
        title: "Calculus Problem Set",
        course: "MATH201 - Calculus II",
        dueDate: "2025-05-20T23:59:59",
        status: "pending",
        description: "Complete problems 1-20 from Chapter 5.",
      },
      {
        id: 3,
        title: "Physics Lab Report",
        course: "PHYS201 - Physics for Engineers",
        dueDate: "2025-05-22T23:59:59",
        status: "pending",
        description: "Write a lab report on the pendulum experiment conducted in lab.",
      },
      {
        id: 4,
        title: "Literary Analysis Essay",
        course: "ENG102 - English Literature",
        dueDate: "2025-05-29T23:59:59",
        status: "pending",
        description: "Write a 3-page analysis of the themes in 'To Kill a Mockingbird'.",
      },
      {
        id: 5,
        title: "Programming Assignment",
        course: "CS101 - Introduction to Computer Science",
        dueDate: "2025-05-15T23:59:59",
        status: "completed",
        description: "Implement a binary search tree in Python.",
        uploadedFile: "binary_search_tree.py",
        submissionDate: "2025-05-10T14:30:00"
      },
      {
        id: 6,
        title: "Calculus Midterm",
        course: "MATH201 - Calculus II",
        dueDate: "2025-05-10T14:30:00",
        status: "completed",
        description: "Midterm examination covering Chapters 1-3.",
        uploadedFile: "calculus_midterm.pdf",
        submissionDate: "2025-05-08T10:15:00"
      },
    ];
  } else if (username === "Prof. Ananya Patel" && userType === "faculty") {
    return [
      {
        id: 1,
        title: "Algorithm Analysis Paper",
        course: "CS101 - Introduction to Computer Science",
        dueDate: "2025-05-25T23:59:59",
        submissions: 15,
        totalStudents: 28,
        status: "active",
        description: "Write a 5-page paper on the time complexity analysis of sorting algorithms."
      },
      {
        id: 2,
        title: "Programming Assignment",
        course: "CS101 - Introduction to Computer Science",
        dueDate: "2025-05-15T23:59:59",
        submissions: 28,
        totalStudents: 28,
        status: "past",
        description: "Implement a binary search tree in Python."
      },
      {
        id: 3,
        title: "Database Design Project",
        course: "CS301 - Database Systems",
        dueDate: "2025-05-30T23:59:59",
        submissions: 5,
        totalStudents: 18,
        status: "active",
        description: "Design a database schema for a hospital management system."
      },
      {
        id: 4,
        title: "Midterm Exam",
        course: "CS202 - Data Structures and Algorithms",
        dueDate: "2025-05-18T10:00:00",
        submissions: 22,
        totalStudents: 22,
        status: "past",
        description: "Midterm examination covering binary trees, heaps, and graphs."
      },
      {
        id: 5,
        title: "Algorithm Implementation",
        course: "CS202 - Data Structures and Algorithms",
        dueDate: "2025-05-28T23:59:59",
        submissions: 10,
        totalStudents: 22,
        status: "active",
        description: "Implement Dijkstra's algorithm and analyze its time complexity."
      },
    ];
  } else {
    // Return empty array for non-demo users
    return [];
  }
};

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  
  // Calculate days difference
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Format date
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  // Return with context
  if (diffDays < 0) {
    return `Past due (${formattedDate})`;
  } else if (diffDays === 0) {
    return `Due today (${formattedDate})`;
  } else if (diffDays === 1) {
    return `Due tomorrow (${formattedDate})`;
  } else {
    return `Due in ${diffDays} days (${formattedDate})`;
  }
}

function getStatusColor(dueDate: string, status: string): string {
  if (status === "completed" || status === "past") {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }
  
  const date = new Date(dueDate);
  const now = new Date();
  
  // Calculate days difference
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  } else if (diffDays <= 2) {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
  } else {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  }
}

function getStatusIcon(dueDate: string, status: string) {
  if (status === "completed" || status === "past") {
    return <CheckCircle2 className="h-4 w-4" />;
  }
  
  const date = new Date(dueDate);
  const now = new Date();
  
  // Calculate days difference
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return <Clock className="h-4 w-4" />;
  } else if (diffDays <= 2) {
    return <AlarmClock className="h-4 w-4" />;
  } else {
    return <Calendar className="h-4 w-4" />;
  }
}

const StudentAssignmentView = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [fileName, setFileName] = useState("");
  const [comments, setComments] = useState("");
  
  useEffect(() => {
    const storedUser = localStorage.getItem('portalUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Check if user has assignments stored
      const storedAssignments = localStorage.getItem(`assignments_${parsedUser.username}`);
      if (storedAssignments) {
        setAssignments(JSON.parse(storedAssignments));
      } else {
        // Only set demo data for demo users
        const isDemoAccount = parsedUser.username === "Rahul Sharma";
        if (isDemoAccount) {
          const defaultAssignments = getDefaultAssignments("student", parsedUser.username);
          setAssignments(defaultAssignments);
        }
      }
    }
  }, []);
  
  const handleUploadAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setOpenDialog(true);
  };
  
  const handleSubmitAssignment = () => {
    if (!selectedAssignment || !fileName) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select a file to upload",
      });
      return;
    }
    
    // Update assignment status
    const updatedAssignments = assignments.map(a => {
      if (a.id === selectedAssignment.id) {
        return {
          ...a,
          status: "completed" as const,
          uploadedFile: fileName,
          submissionDate: new Date().toISOString()
        };
      }
      return a;
    });
    
    setAssignments(updatedAssignments);
    
    // Save to localStorage if not demo account
    const storedUser = localStorage.getItem('portalUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.username !== "Rahul Sharma") {
        localStorage.setItem(`assignments_${parsedUser.username}`, JSON.stringify(updatedAssignments));
      }
    }
    
    setOpenDialog(false);
    setFileName("");
    setComments("");
    
    toast({
      title: "Assignment submitted",
      description: "Your assignment has been submitted successfully",
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };
  
  return (
    <Tabs defaultValue="pending">
      <TabsList className="mb-6">
        <TabsTrigger value="pending">Pending Assignments</TabsTrigger>
        <TabsTrigger value="completed">Completed Assignments</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending" className="space-y-4">
        {assignments.filter(assignment => assignment.status === "pending").length > 0 ? (
          assignments
            .filter(assignment => assignment.status === "pending")
            .map(assignment => (
              <Card key={assignment.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <Badge className={getStatusColor(assignment.dueDate, assignment.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(assignment.dueDate, assignment.status)}
                        {formatDate(assignment.dueDate)}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{assignment.course}</p>
                  <p className="text-sm">{assignment.description}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="w-full" variant="outline">View Assignment</Button>
                  <Button className="w-full" onClick={() => handleUploadAssignment(assignment)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </Button>
                </CardFooter>
              </Card>
            ))
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Pending Assignments</h3>
            <p className="text-sm text-muted-foreground mt-2">
              You don't have any pending assignments right now
            </p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="completed" className="space-y-4">
        {assignments.filter(assignment => assignment.status === "completed").length > 0 ? (
          assignments
            .filter(assignment => assignment.status === "completed")
            .map(assignment => (
              <Card key={assignment.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <Badge className={getStatusColor(assignment.dueDate, assignment.status)}>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Completed
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{assignment.course}</p>
                  <p className="text-sm">{assignment.description}</p>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Submitted File</p>
                        <p className="text-sm flex items-center">
                          <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                          {assignment.uploadedFile || "No file submitted"}
                        </p>
                        {assignment.submissionDate && (
                          <p className="text-xs text-muted-foreground">
                            Submitted on: {new Date(assignment.submissionDate).toLocaleString()}
                          </p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-medium">Grade</p>
                        <p className="text-2xl font-bold">95%</p>
                        <p className="text-xs text-muted-foreground">Excellent work!</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Submission</Button>
                </CardFooter>
              </Card>
            ))
        ) : (
          <div className="text-center py-12">
            <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Completed Assignments</h3>
            <p className="text-sm text-muted-foreground mt-2">
              You haven't completed any assignments yet
            </p>
          </div>
        )}
      </TabsContent>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
            <DialogDescription>
              Upload your completed assignment file and add any comments for your instructor.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assignment-file">Assignment File</Label>
              <Input id="assignment-file" type="file" onChange={handleFileChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comments">Comments (Optional)</Label>
              <Textarea 
                id="comments" 
                placeholder="Add any comments for your instructor..." 
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitAssignment}>Submit Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
};

const FacultyAssignmentView = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('portalUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Check if user has assignments stored
      const storedAssignments = localStorage.getItem(`assignments_faculty_${parsedUser.username}`);
      if (storedAssignments) {
        setAssignments(JSON.parse(storedAssignments));
      } else {
        // Only set demo data for demo users
        const isDemoAccount = parsedUser.username === "Prof. Ananya Patel";
        if (isDemoAccount) {
          const defaultAssignments = getDefaultAssignments("faculty", parsedUser.username);
          setAssignments(defaultAssignments);
        }
      }
    }
  }, []);
  
  return (
    <Tabs defaultValue="active">
      <TabsList className="mb-6">
        <TabsTrigger value="active">Active Assignments</TabsTrigger>
        <TabsTrigger value="past">Past Assignments</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="space-y-4">
        {assignments
          .filter(assignment => assignment.status === "active")
          .map(assignment => (
            <Card key={assignment.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <Badge className={getStatusColor(assignment.dueDate, assignment.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(assignment.dueDate, assignment.status)}
                      {formatDate(assignment.dueDate)}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{assignment.course}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Submissions</p>
                    <p className="flex items-center text-sm">
                      <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                      {assignment.submissions} / {assignment.totalStudents} students
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Completion Rate</p>
                    <p className="text-sm">{Math.round((assignment.submissions / assignment.totalStudents) * 100)}%</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="w-full">Edit Assignment</Button>
                <Button className="w-full">View Submissions</Button>
              </CardFooter>
            </Card>
          ))}
          
        <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
          <FileText className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Create New Assignment</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Add a new assignment for your students
          </p>
          <Button>Create Assignment</Button>
        </Card>
      </TabsContent>
      
      <TabsContent value="past" className="space-y-4">
        {assignments
          .filter(assignment => assignment.status === "past")
          .map(assignment => (
            <Card key={assignment.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <Badge className={getStatusColor(assignment.dueDate, assignment.status)}>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      Completed
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{assignment.course}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Submissions</p>
                    <p className="flex items-center text-sm">
                      <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                      {assignment.submissions} / {assignment.totalStudents} students
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Average Score</p>
                    <p className="text-sm">87%</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Assignment Stats</Button>
              </CardFooter>
            </Card>
          ))}
      </TabsContent>
    </Tabs>
  );
};

const Assignments = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userType: "guest",
    username: "Guest"
  });
  
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
      username: parsedUser.username
    });
  }, [navigate]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">
          {userInfo.userType === "student" 
            ? "View and manage your assignments"
            : "Create and manage assignments for your courses"}
        </p>
      </div>
      
      {userInfo.userType === "student" ? (
        <StudentAssignmentView />
      ) : (
        <FacultyAssignmentView />
      )}
    </div>
  );
};

export default Assignments;
