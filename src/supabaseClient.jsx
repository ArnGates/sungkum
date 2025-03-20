import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce", // ✅ Fix for mobile OAuth flow
  },
});

// Ensure session is restored after login (fixes mobile login)
const refreshSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.log("No session found. Attempting refresh...");
    await supabase.auth.refreshSession();
  }
};

refreshSession();

export default supabase;
