import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        // Wait for Supabase to process OAuth login
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        if (!session) throw new Error("No session found after login.");

        console.log("✅ Authentication successful:", session);
        navigate('/'); // Redirect to home after successful login
      } catch (error) {
        console.error("❌ Auth callback failed:", error);
        navigate('/login');
      }
    };

    handleAuthentication();
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
