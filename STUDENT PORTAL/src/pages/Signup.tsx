
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";
import CopyrightFooter from "@/components/auth/CopyrightFooter";

const Signup = () => {
  const cardFooter = (
    <>
      <div className="text-sm text-center text-muted-foreground">
        Already have an account? <a href="/login" className="underline">Sign In</a>
      </div>
      <CopyrightFooter />
    </>
  );

  return (
    <AuthLayout>
      <AuthCard
        title="Create Account"
        description="Register to access your student or faculty portal"
        footer={cardFooter}
      >
        <SignupForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;
