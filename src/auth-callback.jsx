import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      // Get the current session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        console.error("Auth Callback Error:", error);
        navigate("/login?error=Authentication failed");
        return;
      }

      // Store session in localStorage (for mobile & desktop support)
      localStorage.setItem("supabase.auth.token", JSON.stringify(session));

      // ✅ Redirect to home page
      navigate("/");
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="text-white text-lg animate-pulse">
        Authenticating...
      </div>
    </div>
  );
};

export default AuthCallback;
