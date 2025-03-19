import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        // Wait for Supabase session to update
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          throw new Error(error?.message || "No session found");
        }

        // ✅ Retrieve the return path (if stored)
        const returnTo = localStorage.getItem("returnTo") || "/";
        localStorage.removeItem("returnTo"); // Clear storage

        navigate(returnTo); // Redirect user after login
      } catch (err) {
        console.error("Auth error:", err);
        navigate("/login"); // Redirect back to login if error
      }
    };

    // Subscribe to auth state changes (fixes mobile issues)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        handleAuthentication(); // Handle login event
      }
    });

    return () => {
      authListener?.subscription.unsubscribe(); // Cleanup listener
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <p className="animate-pulse">Authenticating...</p>
    </div>
  );
};

export default AuthCallback;
