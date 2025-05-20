
import { Button } from "@/components/ui/button";

interface DemoLoginButtonsProps {
  onDemoLogin: (userType: 'student' | 'faculty') => void;
}

const DemoLoginButtons = ({ onDemoLogin }: DemoLoginButtonsProps) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-center text-muted-foreground">
        Try our demo accounts:
      </div>
      <div className="flex space-x-2 w-full">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onDemoLogin('student')}
        >
          Demo as Student
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onDemoLogin('faculty')}
        >
          Demo as Faculty
        </Button>
      </div>
    </div>
  );
};

export default DemoLoginButtons;
