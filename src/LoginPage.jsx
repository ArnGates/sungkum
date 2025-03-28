import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Loader } from "lucide-react";
import supabase from "./supabaseClient";
import Footer from "./footer";
import ButtonSection from "./Button"

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Enhanced auth state handling
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) handleSessionUpdate(session);
    };

    const handleSessionUpdate = (session) => {
      const userEmail = session.user.email || 
                      session.user.identities?.[0]?.identity_data?.email;
      
      if (!userEmail) {
        console.error("No email found in session:", session);
        supabase.auth.signOut();
        return;
      }

      setUser({ ...session.user, email: userEmail });
      navigate("/");
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);
        if (event === "SIGNED_IN" && session) {
          handleSessionUpdate(session);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          navigate("/login");
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [navigate]);

  // Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fixed Google OAuth with email handling
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/auth/callback",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
            scope: "openid email profile",
          },
          scopes: "openid email profile",
        },
      });

      if (error) throw error;
      if (data?.url) window.location.href = data.url;

    } catch (err) {
      console.error("Google Login Failed:", err);
      setError(err.message.includes("email") 
        ? "Please grant email access permissions" 
        : "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-950 pt-20">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Welcome, {user.email || "User"}
            </h2>
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
    <div className="flex flex-col min-h-screen bg-gradient-to-t from-black to-gray-950">
      <ButtonSection/>
      <div className="flex flex-1 items-center justify-center mt-15">
        <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
                required 
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
                required 
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md mt-2 transition duration-300 disabled:opacity-50"
            >
              {loading ? <Loader className="animate-spin" size={18} /> : <LogIn size={18} />} Login
            </button>
          </form>

          <div className="text-center my-6 text-gray-400 text-sm">OR</div>

          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-md transition duration-300 disabled:opacity-50"
          >
            Sign in with Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;