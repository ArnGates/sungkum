import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let authSubscription;

    const handleAuthentication = async (session) => {
      try {
        if (!session) {
          const { data: { session: newSession }, error } = await supabase.auth.getSession();
          session = newSession;
          
          if (error || !newSession) {
            throw new Error(error?.message || 'No session found');
          }
        }

        // Get redirect path from localStorage (set before authentication)
        const returnTo = localStorage.getItem('returnTo') || '/';
        localStorage.removeItem('returnTo');
        
        navigate(returnTo);
      } catch (err) {
        console.error('Authentication error:', err);
        navigate(`/login?error=${encodeURIComponent(err.message || 'Unknown error')}`);
      }
    };

    // Set up auth state listener
    authSubscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        handleAuthentication(session);
      }
    }).data.subscription;

    // Initial check for existing session
    handleAuthentication();

    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
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