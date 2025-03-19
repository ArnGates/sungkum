import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from './supabaseClient';

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(checkSession);
    return () => subscription?.unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;