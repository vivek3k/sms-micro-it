
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('portalUser');
    if (storedUser) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  return null;
};

export default Index;
