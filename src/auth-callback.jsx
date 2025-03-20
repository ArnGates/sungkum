import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      console.log("🔄 Handling OAuth Callback...");
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("❌ Error fetching session:", error.message);
      } else {
        console.log("✅ Authenticated User:", data);
      }

      navigate("/"); // Redirect to homepage after login
    };

    handleAuth();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <p>🔄 Processing login...</p>
    </div>
  );
};

export default AuthCallback;
