
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, CheckCircle, Clock, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface UserInfo {
  userType: "student" | "faculty" | "guest";
  username: string;
  isDemo?: boolean;
}

interface CourseProgress {
  name: string;
  progress: number;
}

interface Announcement {
  title: string;
  content: string;
  date: string;
}

// Default demo data
const studentCourseProgress: CourseProgress[] = [
  { name: "Computer Science 101", progress: 75 },
  { name: "Calculus II", progress: 60 },
  { name: "Physics 201", progress: 45 },
  { name: "English Literature", progress: 80 }
];

const studentAnnouncements: Announcement[] = [
  {
    title: "Finals Schedule Posted",
    content: "Finals week schedule is now available. Check your student portal for exam dates.",
    date: "2 days ago"
  },
  {
    title: "Campus Maintenance",
    content: "The library will be closed for maintenance this weekend.",
    date: "3 days ago"
  },
  {
    title: "Academic Advising",
    content: "Remember to schedule your academic advising appointment for next semester registration.",
    date: "1 week ago"
  }
];

const facultyTasks = [
  { title: "Grade Midterm Exams", course: "Computer Science 101" },
  { title: "Prepare Final Exam", course: "Calculus II" },
  { title: "Submit Course Evaluations", course: "All Courses" }
];

const facultyAnnouncements: Announcement[] = [
  {
    title: "Faculty Meeting",
    content: "Reminder: Faculty meeting this Friday at 3 PM in the Conference Room.",
    date: "1 day ago"
  },
  {
    title: "Grade Submission Deadline",
    content: "Final grades must be submitted by June 15th.",
    date: "3 days ago"
  },
  {
    title: "Department Budget Update",
    content: "Budget requests for next academic year are due by the end of the month.",
    date: "1 week ago"
  }
];

const StudentDashboard = ({ isDemo = false }) => {
  const navigate = useNavigate();
  
  // State for real users (non-demo)
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState(0);
  const [activeCourses, setActiveCourses] = useState(0);
  const [nextClass, setNextClass] = useState({ title: "", time: "" });

  useEffect(() => {
    if (isDemo) {
      // Use demo data for demo accounts
      setCourseProgress(studentCourseProgress);
      setAnnouncements(studentAnnouncements);
      setUpcomingAssignments(5);
      setActiveCourses(4);
      setNextClass({ title: "Computer Science 101", time: "Today, 2:00 PM - 3:30 PM" });
    } else {
      // For real users, get data from localStorage or initialize empty
      const storedCourseProgress = localStorage.getItem('courseProgress');
      const storedAnnouncements = localStorage.getItem('announcements');
      const storedAssignments = localStorage.getItem('assignments');
      const storedCourses = localStorage.getItem('courses');
      const storedNextClass = localStorage.getItem('nextClass');

      setCourseProgress(storedCourseProgress ? JSON.parse(storedCourseProgress) : []);
      setAnnouncements(storedAnnouncements ? JSON.parse(storedAnnouncements) : []);
      setUpcomingAssignments(storedAssignments ? JSON.parse(storedAssignments).length : 0);
      setActiveCourses(storedCourses ? JSON.parse(storedCourses).length : 0);
      setNextClass(storedNextClass ? JSON.parse(storedNextClass) : { title: "", time: "" });
    }
  }, [isDemo]);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Assignments</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingAssignments}</div>
          <p className="text-xs text-muted-foreground">
            {upcomingAssignments > 0 ? `${Math.min(3, upcomingAssignments)} due this week` : 'No upcoming assignments'}
          </p>
          <Button variant="link" className="px-0 mt-2" onClick={() => navigate('/assignments')}>
            View all assignments
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCourses}</div>
          <p className="text-xs text-muted-foreground">
            Current semester
          </p>
          <Button variant="link" className="px-0 mt-2" onClick={() => navigate('/courses')}>
            View my courses
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Class</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{nextClass.title || "No upcoming classes"}</div>
          <p className="text-xs text-muted-foreground">
            {nextClass.time || "Check your schedule for details"}
          </p>
          <Button variant="link" className="px-0 mt-2" onClick={() => navigate('/schedule')}>
            View schedule
          </Button>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>
            Your progress across all active courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {courseProgress.length > 0 ? (
            <div className="space-y-4">
              {courseProgress.map((course, index) => (
                <div className="space-y-2" key={index}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{course.name}</div>
                    <div className="text-sm text-muted-foreground">{course.progress}%</div>
                  </div>
                  <Progress value={course.progress} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No active courses to display progress
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length > 0 ? (
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div className={index < announcements.length - 1 ? "border-b pb-3" : ""} key={index}>
                  <p className="font-medium">{announcement.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {announcement.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{announcement.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No announcements to display
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const FacultyDashboard = ({ isDemo = false }) => {
  const navigate = useNavigate();
  
  // State for real users (non-demo)
  const [activeCourses, setActiveCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [nextClass, setNextClass] = useState({ title: "", time: "" });
  const [tasks, setTasks] = useState<{ title: string, course: string }[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    if (isDemo) {
      // Use demo data for demo accounts
      setActiveCourses(3);
      setTotalStudents(78);
      setNextClass({ title: "Computer Science 101", time: "Today, 2:00 PM - 3:30 PM" });
      setTasks(facultyTasks);
      setAnnouncements(facultyAnnouncements);
    } else {
      // For real users, get data from localStorage or initialize empty
      const storedCourses = localStorage.getItem('facultyCourses');
      const storedStudents = localStorage.getItem('facultyStudents');
      const storedNextClass = localStorage.getItem('facultyNextClass');
      const storedTasks = localStorage.getItem('facultyTasks');
      const storedAnnouncements = localStorage.getItem('facultyAnnouncements');

      setActiveCourses(storedCourses ? JSON.parse(storedCourses).length : 0);
      setTotalStudents(storedStudents ? JSON.parse(storedStudents).length : 0);
      setNextClass(storedNextClass ? JSON.parse(storedNextClass) : { title: "", time: "" });
      setTasks(storedTasks ? JSON.parse(storedTasks) : []);
      setAnnouncements(storedAnnouncements ? JSON.parse(storedAnnouncements) : []);
    }
  }, [isDemo]);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCourses}</div>
          <p className="text-xs text-muted-foreground">
            Current semester
          </p>
          <Button variant="link" className="px-0 mt-2" onClick={() => navigate('/courses')}>
            Manage courses
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-muted-foreground">
            Across all courses
          </p>
          <Button variant="link" className="px-0 mt-2" onClick={() => navigate('/students')}>
            View students
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Class</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{nextClass.title || "No upcoming classes"}</div>
          <p className="text-xs text-muted-foreground">
            {nextClass.time || "Check your schedule for details"}
          </p>
          <Button variant="link" className="px-0 mt-2" onClick={() => navigate('/schedule')}>
            View schedule
          </Button>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>
            Assignments and grading to complete
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div className={`flex items-center justify-between ${index < tasks.length - 1 ? "border-b pb-2" : ""}`} key={index}>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.course}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="mr-1 h-4 w-4" /> Mark Complete
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No pending tasks
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length > 0 ? (
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div className={index < announcements.length - 1 ? "border-b pb-3" : ""} key={index}>
                  <p className="font-medium">{announcement.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {announcement.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{announcement.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No announcements to display
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Dashboard = () => {
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
      username: parsedUser.username,
      isDemo: parsedUser.isDemo
    });
  }, [navigate]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {userInfo.username}</h1>
        <p className="text-muted-foreground">
          Here's what's happening in your {userInfo.userType} portal today.
        </p>
      </div>
      
      {userInfo.userType === "student" ? (
        <StudentDashboard isDemo={userInfo.isDemo} />
      ) : (
        <FacultyDashboard isDemo={userInfo.isDemo} />
      )}
    </div>
  );
};

export default Dashboard;
