// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Initialize environment variables (Vite-specific import)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Configure headers for Supabase API compatibility
const supabaseOptions = {
  global: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
};

// Create single instance (no need for globalThis in modern React)
const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions);

// Optional: Expose for debugging
if (import.meta.env.DEV) {
  window.supabase = supabase;
}

export default supabase;