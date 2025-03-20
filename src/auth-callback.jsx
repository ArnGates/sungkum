import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        const { data: session, error } = await supabase.auth.getSession();

        console.log("Supabase Session:", session); // Debugging

        if (error || !session?.session) {
          console.error("Authentication error:", error);
          navigate(`/login?error=${encodeURIComponent(error?.message || "No session found")}`);
        } else {
          navigate('/'); // Redirect to home after login
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        navigate(`/login?error=${encodeURIComponent(err.message)}`);
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <p className="text-white text-lg animate-pulse">Authenticating...</p>
    </div>
  );
};

export default AuthCallback;
