import { useEffect, useState } from "react";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import supabase from "./supabaseClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    fetchUser();

    // ✅ Listen for real-time auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("🔄 Auth State Changed:", session);
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsOpen(false); // ✅ Ensure mobile menu closes
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-950 text-white p-2 flex justify-between items-center w-full px-7 relative z-50 shadow-lg border-b border-gray-700">
      {/* Logo & Name */}
<Link to="/" className="flex items-center gap-2 sm:gap-3">
  <img src="/logo.png" alt="Company Logo" className="h-8 sm:h-18 w-auto cursor-pointer" />
  <span className="text-xl sm:text-3xl font-extrabold font-[Poppins] bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent cursor-pointer">
    Sungkum
  </span>
</Link>


      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4 items-center">
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
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

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ✅ Fixed Mobile Menu */}
      <div
        className={`absolute top-16 right-0 w-64 bg-gray-900 rounded-lg shadow-lg p-3 transform transition-all duration-300 
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : user ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white">
              <UserCircle size={20} />
              <span className="text-xs sm:text-sm">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg w-full flex items-center gap-2 transition duration-300"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg w-full transition duration-300">
                Job Seeker Login
              </button>
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)}>
              <button className="bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg w-full transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
