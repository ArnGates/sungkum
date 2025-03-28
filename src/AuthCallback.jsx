import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import supabase from "./supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("🔄 Processing OAuth callback...");

      // 1. Get code from URL query parameters
      const code = searchParams.get("code");
      
      // 2. Get stored code verifier from localStorage
      const codeVerifier = localStorage.getItem("sb-code-verifier");

      if (!code || !codeVerifier) {
        console.error("❌ Missing code or code verifier");
        navigate("/login");
        return;
      }

      try {
        // 3. Exchange code for session with both values
        const { data, error } = await supabase.auth.exchangeCodeForSession({
          code,
          codeVerifier,
          authMethod: "pkce"  // Explicitly specify PKCE
        });

        if (error) throw error;
        
        if (data?.session) {
          console.log("✅ Session exchange successful");
          navigate("/");
        }
      } catch (err) {
        console.error("❌ Auth failed:", err);
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  return <h1 className="text-white">🔄 Authenticating...</h1>;
};

export default AuthCallback;