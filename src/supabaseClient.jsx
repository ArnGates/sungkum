import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables immediately
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase credentials. Please check your environment variables."
  );
}

// Enhanced storage configuration
const getStorageAdapter = () => {
  // Use sessionStorage only for OAuth callback flow
  const isInAuthCallback = window.location.hash.includes("access_token");
  
  return {
    getItem: (key) => {
      try {
        return isInAuthCallback 
          ? sessionStorage.getItem(key)
          : localStorage.getItem(key);
      } catch (e) {
        console.error("Storage access error:", e);
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        localStorage.setItem(key, value);
        if (isInAuthCallback) {
          sessionStorage.setItem(key, value);
        }
      } catch (e) {
        console.error("Storage set error:", e);
      }
    },
    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      } catch (e) {
        console.error("Storage remove error:", e);
      }
    }
  };
};

// Initialize Supabase Client with mobile-optimized config
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: getStorageAdapter(),
    flowType: 'pkce' // Essential for mobile OAuth
  },
  global: {
    headers: {
      'X-Client-Info': 'mobile-optimized'
    }
  }
});

// Session synchronization helper
const syncSessionAcrossTabs = () => {
  window.addEventListener('storage', (event) => {
    if (event.key?.startsWith('sb-')) {
      window.location.reload();
    }
  });
};

// Debugging utilities
if (import.meta.env.DEV) {
  window.supabase = supabase;
  console.debug("🔧 Supabase Debug Mode Enabled");
  
  // Log auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    console.groupCollapsed(`🔐 Auth State Change: ${event}`);
    console.log("Session:", session);
    console.log("User:", session?.user);
    console.groupEnd();
  });

  // Add storage listener
  syncSessionAcrossTabs();
}

// Mobile session recovery
const attemptMobileSessionRecovery = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    if (!session && window.location.hash.includes("access_token")) {
      window.location.replace(window.location.href.split("#")[0]);
    }
  } catch (error) {
    console.error("Session recovery failed:", error);
  }
};

// Initialize session recovery
if (typeof window !== "undefined") {
  attemptMobileSessionRecovery();
}

export default supabase;