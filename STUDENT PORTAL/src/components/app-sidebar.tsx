
import {
  Book,
  Calendar,
  GraduationCap,
  Home,
  LogOut,
  User,
  Users,
  FileText,
  BadgeIndianRupee,
  CalendarCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userType: "student" | "faculty" | "guest";
  username: string;
}

export function AppSidebar({ userType, username }: SidebarProps) {
  const navigate = useNavigate();

  const studentItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      path: "/courses",
      icon: Book,
    },
    {
      title: "Assignments",
      path: "/assignments",
      icon: GraduationCap,
    },
    {
      title: "Attendance",
      path: "/attendance",
      icon: CalendarCheck,
    },
    {
      title: "Fee Payment",
      path: "/fee-payment",
      icon: BadgeIndianRupee,
    },
    {
      title: "Schedule",
      path: "/schedule",
      icon: Calendar,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  const facultyItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      path: "/courses",
      icon: Book,
    },
    {
      title: "Students",
      path: "/students",
      icon: Users,
    },
    {
      title: "Attendance",
      path: "/attendance-management",
      icon: CalendarCheck,
    },
    {
      title: "Performance",
      path: "/student-performance",
      icon: FileText,
    },
    {
      title: "Schedule",
      path: "/schedule",
      icon: Calendar,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  const guestItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "Login",
      path: "/login",
      icon: User,
    },
    {
      title: "Register",
      path: "/signup",
      icon: Users,
    },
    {
      title: "Demo: Student",
      path: "/login?demo=student",
      icon: User,
    },
    {
      title: "Demo: Faculty",
      path: "/login?demo=faculty",
      icon: Users,
    },
  ];

  const menuItems = userType === "student" 
    ? studentItems 
    : userType === "faculty" 
      ? facultyItems 
      : guestItems;

  // Get initials from username
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-education-600" />
          <span className="text-lg font-semibold">
            Student Portal
          </span>
        </div>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "gap-2",
                      location.pathname === item.path &&
                        "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{getInitials(username)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-muted-foreground capitalize">{userType}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            {userType !== "guest" && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/login")}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
