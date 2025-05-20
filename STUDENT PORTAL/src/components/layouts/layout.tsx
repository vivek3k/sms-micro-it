
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { useEffect, useState } from "react";

export const Layout = () => {
  const [userInfo, setUserInfo] = useState({
    userType: "guest" as "student" | "faculty" | "guest",
    username: "Guest User"
  });

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('portalUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo({
        userType: parsedUser.userType,
        username: parsedUser.username
      });
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <div className="flex flex-1">
          <AppSidebar 
            userType={userInfo.userType} 
            username={userInfo.username} 
          />
          <main className="flex-1 overflow-y-auto">
            <div className="container py-6">
              <Outlet />
            </div>
          </main>
        </div>
        <footer className="py-3 text-center text-xs text-muted-foreground">
          © All Rights Reserved. Design & Developed by Purushotham
        </footer>
      </div>
    </SidebarProvider>
  );
};
