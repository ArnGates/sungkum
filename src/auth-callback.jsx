import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { error } = await supabase.auth.getSession();

        if (error) throw error;
        navigate("/"); // Redirect to home after login
      } catch (error) {
        console.error("Auth callback failed:", error);
        navigate("/login");
      }
    };

    handleAuth();
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
