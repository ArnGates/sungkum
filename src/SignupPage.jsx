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

  const handleSignUp = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    // Validation checks
    if (!email || !username || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      setErrorMessage("Username must be 3-20 characters (letters, numbers, underscores)");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    try {
      // Check username availability
      const { data: usernameData, error: usernameError } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();

      if (usernameData) {
        setErrorMessage("Username already taken");
        return;
      }

      // Attempt user registration
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        // Handle known error cases
        if (
          error.message.includes("already registered") ||
          error.message.includes("duplicate key") ||
          error.message.includes("user already exists")
        ) {
          throw new Error("Email address already registered");
        }
        throw error;
      }

      // Only show success if no errors
      setSuccessMessage("Signup successful! Please check your email for verification.");
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage(
        error.message.includes("Email address already registered")
          ? error.message
          : "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 to-black/100 pt-20">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-lg shadow-md p-6 text-white">
          <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-md mb-3"
          />

          <input
            type="text"
            placeholder="Username (3-20 characters)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-md mb-3"
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-md mb-3"
          />

          <button
            onClick={handleSignUp}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-md"
          >
            <UserPlus size={18} /> Sign Up
          </button>

          <p className="text-center text-gray-400 mt-3">
            Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;