import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
});

// Enhanced auth listener with email verification
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log(`🔄 Auth state changed: ${event}`, session);

  if (event === "SIGNED_IN") {
    const user = supabase.auth.getUser();
    console.log("✅ User signed in. User object:", user);

    // Check for email in multiple locations
    const email = user?.email || 
                 session?.user?.identities?.[0]?.identity_data?.email;
    
    if (!email) {
      console.error("❌ No email found in user data!");
      await supabase.auth.signOut();
      return;
    }

    console.log("📧 Retrieved email:", email);
    // Store email in localStorage for debugging
    localStorage.setItem("sb-email", email);
  }
  else if (event === "SIGNED_OUT") {
    localStorage.removeItem("sb-email");
  }
});

export default supabase;