// SignupPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import supabase from "./supabaseClient";
import Footer from "./footer";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email || !username || !password) {
      setErrorMessage("All fields are required");
      return false;
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      setErrorMessage("Username must be 3-20 characters (letters, numbers, underscores)");
      return false;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Case-insensitive username check
      const { data: usernameData, error: usernameError } = await supabase
        .from("profiles")
        .select("username")
        .ilike("username", username)
        .maybeSingle();

      if (usernameError) throw usernameError;
      if (usernameData) {
        setErrorMessage("Username already taken");
        return;
      }

      // Create user with metadata
      const { data: user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            username,
            email_verified: false 
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        if (error.message.includes("already exists")) {
          throw new Error("Email already registered");
        }
        throw error;
      }

      if (user?.identities?.length === 0) {
        throw new Error("User already exists");
      }

      setSuccessMessage("Check your email for verification link!");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage(
        error.message.includes("unique") || error.message.includes("exists")
          ? "Email or username already exists"
          : "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 to-black/100 pt-20">
      <div className="flex flex-1 items-center justify-center">
        <form onSubmit={handleSignUp} className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-lg shadow-md p-6 text-white">
          <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>

          {errorMessage && <p className="text-red-500 text-center mb-3">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center mb-3">{successMessage}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-md mb-3"
            autoComplete="email"
            required
          />

          <input
            type="text"
            placeholder="Username (3-20 characters)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-md mb-3"
            autoComplete="username"
            pattern="^[a-zA-Z0-9_]{3,20}$"
            required
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-md mb-3"
            autoComplete="new-password"
            minLength="6"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-md disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <UserPlus size={18} /> Sign Up
              </>
            )}
          </button>

          <p className="text-center text-gray-400 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;