import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      console.log("🔄 Handling OAuth Callback...");

      // Listen for authentication changes
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (error || !sessionData?.session) {
        console.error("❌ Authentication failed:", error?.message || "No session found");

        // Retry authentication (optional)
        supabase.auth.refreshSession();

        // Redirect to login with an error
        navigate("/login?error=auth_failed");
        return;
      }

      console.log("✅ Authenticated User:", sessionData.session.user);

      // Store session info in localStorage (optional)
      localStorage.setItem("supabaseSession", JSON.stringify(sessionData.session));

      // Redirect user to dashboard or home
      navigate("/");
    };

    handleAuth();

    // Listen for real-time auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("✅ User signed in:", session.user);
        navigate("/");
      }
    });

    // Cleanup the listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <p>🔄 Processing login...</p>
    </div>
  );
};

export default AuthCallback;
