
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthCard = ({ title, description, children, footer }: AuthCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={typeof footer === 'string' ? "flex justify-center" : "flex flex-col space-y-4"}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthCard;
