import React, { useState, useEffect } from "react";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) throw error;
        setUser(user ?? null);
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
        if (error.message.includes("session missing")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "INITIAL_SESSION") return;
        await checkUser();
      }
    );

    return () => subscription?.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <nav className="bg-gradient-to-r from-gray-950 to-black text-white p-5 flex justify-between items-center w-full px-7 relative z-50 shadow-lg border-b border-gray-700">
        <div className="animate-pulse flex items-center gap-3">
          <div className="h-8 w-8 bg-gray-700 rounded-full" aria-hidden="true" />
          <div className="h-4 w-24 bg-gray-700 rounded" aria-hidden="true" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-gray-950 to-black text-white p-5 flex justify-between items-center w-full px-7 relative z-50 shadow-lg border-b border-gray-700">
      {/* Logo Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <img 
          src="/logo.png" 
          alt="Sungkum Logo" 
          className="h-8 sm:h-12 w-auto" 
          role="img"
          aria-label="Company logo"
        />
        <span className="text-xl sm:text-3xl font-extrabold font-[Poppins] bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
          Sungkum
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <UserCircle size={28} aria-hidden="true" />
              <span className="text-lg truncate max-w-[160px]" title={user.email}>
                {user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300"
              aria-label="Logout"
            >
              <LogOut size={20} aria-hidden="true" />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/signup">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">
                Job Seeker Login
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Content */}
      <div 
        className={`fixed md:hidden top-16 right-0 w-64 bg-gray-900 rounded-lg shadow-lg p-3 transform transition-all duration-300 z-50 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="menu"
        aria-hidden={!isOpen}
      >
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white pb-2 border-b border-gray-700">
              <UserCircle size={20} aria-hidden="true" />
              <span 
                className="text-sm truncate max-w-[200px]" 
                title={user.email}
              >
                {user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition duration-300"
              aria-label="Logout"
            >
              <LogOut size={16} aria-hidden="true" />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Link 
              to="/signup" 
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <button className="bg-gray-700 hover:bg-gray-600 text-white w-full px-3 py-2 rounded-lg transition duration-300">
                Sign Up
              </button>
            </Link>
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white w-full px-3 py-2 rounded-lg transition duration-300">
                Job Seeker Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;