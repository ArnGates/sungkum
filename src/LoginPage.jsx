import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Loader } from "lucide-react";
import Footer from "./footer";
import supabase from "./supabaseClient";

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) navigate("/");
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) navigate("/");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: "google",
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
      
    } catch (err) {
      setError("Google login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (user) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 to-black/100 pt-20">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-lg shadow-md p-6 text-white">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Welcome, {user.user_metadata?.username || "User"}
            </h2>
            <div className="text-center mb-4 text-gray-300 text-sm">{user.email}</div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-md"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 to-black/100 pt-20">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-lg shadow-md p-6 text-white">
          <h2 className="text-2xl font-semibold text-center mb-4">Welcome Back</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-md"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-md mt-3"
              required
              minLength={6}
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md mt-3 disabled:opacity-50"
            >
              {loading ? <Loader className="animate-spin" size={18} /> : <LogIn size={18} />}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center my-4 text-gray-400 text-sm">or</div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-md disabled:opacity-50"
          >
            Sign in with Google
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
