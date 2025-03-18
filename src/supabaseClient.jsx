// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Ensure only one instance is created globally
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const globalForSupabase = globalThis.supabase || null;

const supabase =
  globalForSupabase ??
  createClient(supabaseUrl, supabaseAnonKey);

// Avoid creating multiple instances
if (!globalThis.supabase) {
  globalThis.supabase = supabase;
}

export default supabase;
