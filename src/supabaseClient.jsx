import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Singleton pattern with mobile detection
let supabaseInstance = null;

const getSupabase = () => {
  if (!supabaseInstance) {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: isMobile ? sessionStorage : localStorage,
        storageKey: 'sb_session'
      }
    });
  }
  return supabaseInstance;
};

// Export singleton instance
const supabase = getSupabase();

// Development utilities
if (import.meta.env.DEV) {
  window.supabase = supabase;
  console.debug('Supabase singleton initialized');
}

export default supabase;