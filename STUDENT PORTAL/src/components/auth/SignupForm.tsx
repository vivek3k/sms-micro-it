
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormField from "./FormField";

const SignupForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"student" | "faculty">("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    facultyId: "",
    department: "",
    semester: "",
    position: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    
    const { name, email, password, confirmPassword } = formData;
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Registration Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Registration Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    // Store user account information in localStorage
    // First, check if portalAccounts exists, if not create it
    let accounts = [];
    const accountsStr = localStorage.getItem('portalAccounts');
    
    if (accountsStr) {
      try {
        accounts = JSON.parse(accountsStr);
        if (!Array.isArray(accounts)) {
          console.error('portalAccounts is not an array, resetting');
          accounts = [];
        }
      } catch (error) {
        console.error('Error parsing portalAccounts, resetting', error);
        accounts = [];
      }
    }
    
    // Log the current accounts for debugging
    console.log('Current accounts before adding new one:', accounts);
    
    // Create the new account object
    const newAccount = {
      userType: userType,
      username: name,
      email: email,
      password: password  // In a real app, this would be hashed
    };
    
    // Add the new account to the array
    accounts.push(newAccount);
    console.log('Accounts after adding new one:', accounts);
    
    // Save the updated accounts back to localStorage
    localStorage.setItem('portalAccounts', JSON.stringify(accounts));
    
    // Set user information in localStorage with isDemo flag as false
    localStorage.setItem('portalUser', JSON.stringify({
      userType: userType,
      username: name,
      isDemo: false  // Mark as not a demo account
    }));
    
    toast({
      title: "Registration Successful",
      description: `Welcome, ${name}!`,
    });
    
    navigate('/dashboard');
  };

  return (
    <Tabs defaultValue="student" onValueChange={(value) => setUserType(value as "student" | "faculty")}>
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="faculty">Faculty</TabsTrigger>
      </TabsList>
      
      <form onSubmit={handleSignup}>
        <div className="space-y-4">
          <FormField 
            id="name" 
            name="name"
            label="Full Name"
            placeholder="Enter your full name" 
            value={formData.name}
            onChange={handleChange}
          />
          
          <FormField 
            id="email" 
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email" 
            value={formData.email}
            onChange={handleChange}
          />
          
          <TabsContent value="student">
            <div className="space-y-4">
              <FormField 
                id="studentId" 
                name="studentId"
                label="Student ID"
                placeholder="Enter your student ID" 
                value={formData.studentId}
                onChange={handleChange}
              />
              
              <div className="space-y-2">
                <label htmlFor="department" className="block text-sm font-medium">Department</label>
                <Select name="department" value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ec">Electronics & Communication</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="ce">Civil Engineering</SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="semester" className="block text-sm font-medium">Semester</label>
                <Select name="semester" value={formData.semester} onValueChange={(value) => handleSelectChange("semester", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Semester</SelectItem>
                    <SelectItem value="2">2nd Semester</SelectItem>
                    <SelectItem value="3">3rd Semester</SelectItem>
                    <SelectItem value="4">4th Semester</SelectItem>
                    <SelectItem value="5">5th Semester</SelectItem>
                    <SelectItem value="6">6th Semester</SelectItem>
                    <SelectItem value="7">7th Semester</SelectItem>
                    <SelectItem value="8">8th Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faculty">
            <div className="space-y-4">
              <FormField 
                id="facultyId" 
                name="facultyId"
                label="Faculty ID"
                placeholder="Enter your faculty ID" 
                value={formData.facultyId}
                onChange={handleChange}
              />
              
              <div className="space-y-2">
                <label htmlFor="department" className="block text-sm font-medium">Department</label>
                <Select name="department" value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ec">Electronics & Communication</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="ce">Civil Engineering</SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="position" className="block text-sm font-medium">Position</label>
                <Select name="position" value={formData.position} onValueChange={(value) => handleSelectChange("position", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assistant">Assistant Professor</SelectItem>
                    <SelectItem value="associate">Associate Professor</SelectItem>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="hod">Head of Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <FormField 
            id="password" 
            name="password"
            label="Password"
            type="password"
            placeholder="Create a password" 
            value={formData.password}
            onChange={handleChange}
          />
          
          <FormField 
            id="confirmPassword" 
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password" 
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          
          <Button className="w-full" type="submit">
            Register
          </Button>
        </div>
      </form>
    </Tabs>
  );
};

export default SignupForm;
