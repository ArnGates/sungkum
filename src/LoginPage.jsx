import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Loader } from "lucide-react";
import supabase from "./supabaseClient";
import Footer from "./footer";

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to check if the device is mobile
  const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) navigate("/");
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        if (event === "SIGNED_IN") navigate("/");
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Email/Password Login Handler
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Google Login Handler (Fixes for Mobile)
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth-callback`,
          queryParams: {
            prompt: "select_account", // ✅ Force account selection
            display: isMobile() ? "touch" : "popup"
          }
        }
      });

      if (error) throw error;

      // ✅ Mobile fix: Redirects user to the login URL instead of using a popup
      if (isMobile() && data?.url) {
        window.location.href = data.url;
      }

    } catch (err) {
      setError(isMobile() ? 
        "Please complete login in your browser" : 
        "Google login failed");
      console.error("Auth Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // If user is logged in, show Welcome Page
  if (user) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 to-black/100 pt-20">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-lg shadow-md p-6 text-white">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Welcome, {user.user_metadata?.name || "User"}
            </h2>
            <div className="text-center mb-4 text-gray-300 text-sm">
              {user.email}
            </div>
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

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin}>
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
              {loading ? "Logging in..." : "Login with Email"}
            </button>
          </form>

          <div className="text-center my-4 text-gray-400 text-sm">or</div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-md disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path 
                d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.332 15.139 1 12.545 1 7.021 1 2.545 5.476 2.545 11s4.476 10 10 10c5.523 0 10-4.476 10-10 0-.671-.069-1.325-.189-1.971H12.545z" 
                fill="currentColor"
              />
            </svg>
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
