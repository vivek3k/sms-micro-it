
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, GraduationCap, Mail, MapPin, Phone, User as UserIcon } from "lucide-react";

interface UserInfo {
  userType: "student" | "faculty" | "guest";
  username: string;
}

const StudentProfile = () => {
  const { toast } = useToast();
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };
  
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="academic">Academic</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@university.edu" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" defaultValue="(123) 456-7890" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Change Password</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>
                Update your address and emergency contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street address</Label>
                <Input id="address" defaultValue="123 University Ave" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="College Town" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip code</Label>
                  <Input id="zip" defaultValue="12345" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency-contact">Emergency contact</Label>
                <Input id="emergency-contact" defaultValue="Jane Doe (Parent) - (987) 654-3210" />
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="academic">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>
                Your program and enrollment details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Student ID</span>
                  <span className="font-medium">S123456789</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Program</span>
                  <span className="font-medium">Bachelor of Science in Computer Science</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Academic Year</span>
                  <span className="font-medium">Junior (3rd Year)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Enrollment Status</span>
                  <span className="font-medium">Full-Time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Advisor</span>
                  <span className="font-medium">Prof. Robert Johnson</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
              <CardDescription>
                Your current GPA and credit information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current GPA</span>
                  <span className="font-medium">3.75 / 4.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Credits Completed</span>
                  <span className="font-medium">78 / 120</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current Semester Credits</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expected Graduation</span>
                  <span className="font-medium">May 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Dean's List</span>
                  <span className="font-medium flex items-center">
                    Yes <CheckCircle2 className="h-4 w-4 ml-1 text-green-500" />
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">View Full Transcript</Button>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Course History</CardTitle>
              <CardDescription>
                Courses you've completed and their grades.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Fall 2023</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span>CS100: Introduction to Programming</span>
                      <span className="font-medium">A</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>MATH101: Calculus I</span>
                      <span className="font-medium">A-</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>ENG101: College Writing</span>
                      <span className="font-medium">B+</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>PHYS101: Physics I</span>
                      <span className="font-medium">A</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Spring 2024</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span>CS150: Data Structures</span>
                      <span className="font-medium">A</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>MATH102: Calculus II</span>
                      <span className="font-medium">B+</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>PHYS102: Physics II</span>
                      <span className="font-medium">A-</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>HIST101: World History</span>
                      <span className="font-medium">A</span>
                    </li>
                  </ul>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">View Complete Course History</Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Choose how you want to receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-assignments" className="flex items-center space-x-2">
                    <span>Assignment updates</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="email-assignments"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-grades" className="flex items-center space-x-2">
                    <span>Grade postings</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="email-grades"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-announcements" className="flex items-center space-x-2">
                    <span>Course announcements</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="email-announcements"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-events" className="flex items-center space-x-2">
                    <span>Campus events</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="email-events"
                    className="h-4 w-4"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">SMS Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-urgent" className="flex items-center space-x-2">
                    <span>Urgent notifications only</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="sms-urgent"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-due" className="flex items-center space-x-2">
                    <span>Assignment due date reminders</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="sms-due"
                    className="h-4 w-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-campus" className="flex items-center space-x-2">
                    <span>Campus emergency alerts</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="sms-campus"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSaveProfile}>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const FacultyProfile = () => {
  const { toast } = useToast();
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };
  
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="teaching">Teaching</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl">JS</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" defaultValue="Professor" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" defaultValue="Computer Science" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="Smith" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jane.smith@university.edu" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" defaultValue="(123) 456-7890" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Change Password</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Office Information</CardTitle>
              <CardDescription>
                Update your office location and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="office">Office Location</Label>
                <Input id="office" defaultValue="Science Building, Room 315" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="office-hours">Office Hours</Label>
                <Input id="office-hours" defaultValue="Monday/Wednesday 1:00 PM - 3:00 PM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department-phone">Department Phone</Label>
                <Input id="department-phone" defaultValue="(123) 456-7000 ext. 1234" />
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="teaching">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Information</CardTitle>
              <CardDescription>
                Your academic appointment and teaching details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Faculty ID</span>
                  <span className="font-medium">F987654321</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Academic Rank</span>
                  <span className="font-medium">Associate Professor</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tenure Status</span>
                  <span className="font-medium">Tenured</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Appointment Type</span>
                  <span className="font-medium">Full-Time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Department Chair</span>
                  <span className="font-medium">Prof. David Chen</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Research & Publications</CardTitle>
              <CardDescription>
                Your research interests and recent publications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="research">Research Interests</Label>
                <textarea
                  id="research"
                  className="w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue="Artificial Intelligence, Machine Learning, Natural Language Processing, Computer Vision"
                />
              </div>
              <div className="space-y-2">
                <Label>Recent Publications</Label>
                <ul className="space-y-2 text-sm">
                  <li className="border-b pb-2">
                    Smith, J., et al. (2023). "Advances in Neural Network Architectures." Journal of AI Research, 45(2), 112-128.
                  </li>
                  <li className="border-b pb-2">
                    Johnson, R., Smith, J. (2022). "Deep Learning Applications in Education." International Conference on Educational Technology, 78-92.
                  </li>
                  <li>
                    Smith, J. (2021). "Computer Vision Approaches to Student Engagement Analysis." Journal of Educational Data Mining, 12(3), 45-61.
                  </li>
                </ul>
              </div>
              <Button variant="outline" className="w-full mt-4">Edit Publications</Button>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Course Teaching History</CardTitle>
              <CardDescription>
                Courses you've taught in previous semesters.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Fall 2023</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span>CS100: Introduction to Programming</span>
                      <span className="font-medium">32 students</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>CS210: Object-Oriented Programming</span>
                      <span className="font-medium">25 students</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>CS401: Senior Project I</span>
                      <span className="font-medium">18 students</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Spring 2023</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span>CS101: Introduction to Computer Science</span>
                      <span className="font-medium">30 students</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>CS202: Data Structures and Algorithms</span>
                      <span className="font-medium">24 students</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>CS402: Senior Project II</span>
                      <span className="font-medium">18 students</span>
                    </li>
                  </ul>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">View Complete Teaching History</Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Choose how you want to receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-assignments" className="flex items-center space-x-2">
                    <span>Student submissions</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="email-assignments"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-grades" className="flex items-center space-x-2">
                    <span>Grade posting confirmations</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="email-grades"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-announcements" className="flex items-center space-x-2">
                    <span>Department announcements</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="email-announcements"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-events" className="flex items-center space-x-2">
                    <span>Faculty events</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="email-events"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">SMS Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-urgent" className="flex items-center space-x-2">
                    <span>Urgent notifications only</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="sms-urgent"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-schedule" className="flex items-center space-x-2">
                    <span>Schedule changes</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="sms-schedule"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-campus" className="flex items-center space-x-2">
                    <span>Campus emergency alerts</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="sms-campus"
                    className="h-4 w-4"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSaveProfile}>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const Profile = () => {
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
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          {userInfo.userType === "student" 
            ? "Manage your student profile and preferences"
            : "Manage your faculty profile and preferences"}
        </p>
      </div>
      
      {userInfo.userType === "student" ? (
        <StudentProfile />
      ) : (
        <FacultyProfile />
      )}
    </div>
  );
};

export default Profile;
