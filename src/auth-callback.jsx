import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle potential URL hash fragments (common in OAuth flows)
    const handleHashFragment = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data?.session) {
        console.error("Authentication error:", error?.message || "No session");
        navigate("/login?error=auth_failed");
        return;
      }

      navigate("/dashboard");
    };

    // Vercel-specific: Add slight delay for edge network stabilization
    const authTimer = setTimeout(() => {
      handleHashFragment().catch(console.error);
    }, 300);

    return () => clearTimeout(authTimer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <p>🔐 Authenticating...</p>
    </div>
  );
};

export default AuthCallback;