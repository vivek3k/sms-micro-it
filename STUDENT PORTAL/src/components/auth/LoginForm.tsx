
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormField from "./FormField";

interface LoginFormProps {
  onDemoLogin: (userType: 'student' | 'faculty') => void;
}

const LoginForm = ({ onDemoLogin }: LoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [facultyUsername, setFacultyUsername] = useState('');
  const [facultyPassword, setFacultyPassword] = useState('');

  const checkAccountExists = (userType: 'student' | 'faculty', username: string, password: string): boolean => {
    try {
      // Check if accounts exist in localStorage
      const accountsStr = localStorage.getItem('portalAccounts');
      if (!accountsStr) {
        console.log('No accounts found in localStorage');
        return false;
      }
      
      const accounts = JSON.parse(accountsStr);
      console.log(`Checking account: ${userType} - ${username}`);
      console.log('Available accounts:', accounts);
      
      // Check if any account matches the criteria
      const accountExists = accounts.some((account: any) => {
        const matches = account.userType === userType && 
                        account.username === username &&
                        account.password === password;
        console.log(`Account match check: ${account.username} - ${matches}`);
        return matches;
      });
      
      console.log(`Account exists: ${accountExists}`);
      return accountExists;
    } catch (error) {
      console.error("Error checking account:", error);
      return false;
    }
  };

  const handleLogin = (userType: 'student' | 'faculty') => {
    let username = '';
    let password = '';
    
    if (userType === 'student') {
      username = studentUsername;
      password = studentPassword;
    } else {
      username = facultyUsername;
      password = facultyPassword;
    }
    
    if (!username) {
      toast({
        title: "Login Error",
        description: "Please enter your ID",
        variant: "destructive"
      });
      return;
    }
    
    if (!password) {
      toast({
        title: "Login Error",
        description: "Please enter your password",
        variant: "destructive"
      });
      return;
    }
    
    // Check if account exists with matching password
    if (!checkAccountExists(userType, username, password)) {
      toast({
        title: "Account Not Found",
        description: "This account does not exist or password is incorrect. Please sign up first.",
        variant: "destructive"
      });
      return;
    }
    
    // Set user information in localStorage
    localStorage.setItem('portalUser', JSON.stringify({
      userType: userType,
      username: username,
      isDemo: false  // Mark as not a demo account
    }));
    
    toast({
      title: "Login Successful",
      description: `Welcome, ${username}!`,
    });
    
    navigate('/dashboard');
  };

  return (
    <Tabs defaultValue="student">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="faculty">Faculty</TabsTrigger>
      </TabsList>
      
      <TabsContent value="student">
        <div className="space-y-4">
          <FormField 
            id="student-id" 
            label="Student ID"
            placeholder="Enter your student ID" 
            value={studentUsername}
            onChange={(e) => setStudentUsername(e.target.value)}
          />
          <FormField 
            id="student-password" 
            label="Password"
            type="password" 
            placeholder="Enter your password" 
            value={studentPassword}
            onChange={(e) => setStudentPassword(e.target.value)}
          />
          <Button 
            className="w-full" 
            onClick={() => handleLogin('student')}
          >
            Sign In
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="faculty">
        <div className="space-y-4">
          <FormField 
            id="faculty-id" 
            label="Faculty ID"
            placeholder="Enter your faculty ID" 
            value={facultyUsername}
            onChange={(e) => setFacultyUsername(e.target.value)}
          />
          <FormField 
            id="faculty-password" 
            label="Password"
            type="password" 
            placeholder="Enter your password" 
            value={facultyPassword}
            onChange={(e) => setFacultyPassword(e.target.value)}
          />
          <Button 
            className="w-full"
            onClick={() => handleLogin('faculty')}
          >
            Sign In
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
