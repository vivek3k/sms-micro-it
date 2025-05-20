
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import DemoLoginButtons from "@/components/auth/DemoLoginButtons";
import CopyrightFooter from "@/components/auth/CopyrightFooter";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const demoType = searchParams.get('demo');

  useEffect(() => {
    // If demo parameter is present, log in as the demo user
    if (demoType === 'student') {
      handleDemoLogin('student');
    } else if (demoType === 'faculty') {
      handleDemoLogin('faculty');
    }
    
    // For debugging: print all accounts in localStorage
    const accounts = JSON.parse(localStorage.getItem('portalAccounts') || '[]');
    console.log('Available accounts:', accounts);
  }, [demoType]);

  const handleDemoLogin = (userType: 'student' | 'faculty') => {
    const username = userType === 'student' ? 'Rahul Sharma' : 'Prof. Ananya Patel';
    
    // Set demo user information in localStorage with isDemo flag
    localStorage.setItem('portalUser', JSON.stringify({
      userType: userType,
      username: username,
      isDemo: true  // Mark as demo account
    }));
    
    toast({
      title: "Demo Login",
      description: `Welcome to the ${userType} demo, ${username}!`,
    });
    
    navigate('/dashboard');
  };

  const cardFooter = (
    <>
      <div className="text-sm text-center text-muted-foreground">
        Don't have an account? <a href="/signup" className="underline">Register</a>
      </div>
      <DemoLoginButtons onDemoLogin={handleDemoLogin} />
      <CopyrightFooter />
    </>
  );

  return (
    <AuthLayout>
      <AuthCard 
        title="Welcome Back"
        description="Login to access your student or faculty portal"
        footer={cardFooter}
      >
        <LoginForm onDemoLogin={handleDemoLogin} />
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
