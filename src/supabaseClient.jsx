import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing.");
}

// Improved mobile detection
const isMobile = () => {
  if (typeof window === "undefined") return false; // Avoid errors in SSR
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

// Initialize Supabase Client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: isMobile() ? sessionStorage : localStorage,
    storageKey: "sb_session"
  }
});

// Debugging in Development Mode
if (import.meta.env.DEV) {
  window.supabase = supabase;
  console.debug("✅ Supabase initialized (Debug Mode)");
}

export default supabase;
