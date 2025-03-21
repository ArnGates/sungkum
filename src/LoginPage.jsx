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

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("✅ User signed in:", session.user);
        setUser(session.user);

        // Save session for persistence
        localStorage.setItem("supabaseSession", JSON.stringify(session));

        // Redirect after login
        navigate("/");
      } else if (event === "SIGNED_OUT") {
        console.log("🚪 User logged out.");
        setUser(null);
        localStorage.removeItem("supabaseSession");
        navigate("/login");
      }
    });

    return () => authListener?.subscription.unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      // Redirect handled by auth state listener
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth-callback`,
          flow: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? "implicit" : "pkce",
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError("Google login failed. Try again.");
      console.error("Auth Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("supabaseSession");
    navigate("/login");
  };

  if (user) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-950 pt-20">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-2xl font-semibold text-center mb-4">Welcome, {user.email}</h2>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-md">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-t from-black to-gray-950 pt-20">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {/* Email & Password Login */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md mt-2 transition duration-300 disabled:opacity-50">
              {loading ? <Loader className="animate-spin" size={18} /> : <LogIn size={18} />} Login
            </button>
          </form>

          {/* Divider */}
          <div className="text-center my-6 text-gray-400 text-sm">OR</div>

          {/* Google Login */}
          <button onClick={handleGoogleLogin} disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-md transition duration-300 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="currentColor" d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.332 15.139 1 12.545 1 7.021 1 2.545 5.476 2.545 11s4.476 10 10 10c5.523 0 10-4.476 10-10 0-.671-.069-1.325-.189-1.971H12.545z" />
            </svg>
            Sign in with Google
          </button>

          {/* Sign-up link */}
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
