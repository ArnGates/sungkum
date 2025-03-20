import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (error) {
        console.error("OAuth callback error:", error.message);
      }
      navigate("/"); // Redirect to homepage after successful login
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <p>Authenticating...</p>
    </div>
  );
};

export default AuthCallback;
