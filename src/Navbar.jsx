import { useEffect, useState } from "react";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import supabase from "./supabaseClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    // ✅ Listen for real-time auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white p-2 flex justify-between items-center w-full px-7 relative z-50 shadow-lg border-b border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <img src="/logo.png" alt="Logo" className="h-8 sm:h-10 w-auto" />
        <span className="text-xl sm:text-3xl font-extrabold">Sungkum</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <div className="flex items-center gap-3">
            <UserCircle size={28} />
            <span className="text-lg">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">
              Job Seeker Login
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
