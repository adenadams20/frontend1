import { useState, useEffect } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavbarNotifications from "./NavbarNotifications";
import logo from "../assets/img/WECCOO.jpeg";



export default function Navbar({ onSidebarToggle }) {
  const { user, loadingAuth } = useAuth();
  const navigate = useNavigate();

  // 🌙 MODE SOMBRE (AJOUT)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const goToProfile = () => {
    navigate("/settings", { state: { tab: "profil" } });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#022b53] flex text-white shadow">
      <div className="p-2 md:ml-0 md:pl-0 items-center w-full flex justify-between">

        <div className="flex">
          {/* 🔥 TOGGLE SIDEBAR (MOBILE) */}
          <button
            onClick={onSidebarToggle}
            className="md:hidden"
          >
            <Menu size={28} />
          </button>

          <div className="hidden md:flex flex-row items-center ml-5 z-20 shadow">
  {/* LOGO */}
  <img src={logo} alt="WECCO" className="w-15 h-15 rounded-full" />
  <div className="ml-2">
    <h2 className="text-2xl font-bold text-gray-100">WECCO</h2>
  </div>
</div>

        </div>

        

        {/* ACTIONS NAVBAR */}
        <div className="flex items-center justify-end  gap-4">

          {/* 🌙 DARK MODE (AJOUT FONCTIONNEL) */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hover:text-gray-300"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {/* NOTIFICATIONS */}
          <NavbarNotifications backendUrl={BACKEND_URL} />

          {/* PROFIL */}
          <button
            type="button"
            onClick={goToProfile}
            className="flex items-center gap-2 hover:text-gray-300 px-2 py-1 rounded-lg transition"
          >
            {/* AVATAR */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {user?.avatarUrl ? (
                <img
                  src={`${BACKEND_URL}${user.avatarUrl}`}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold text-gray-600">
                  {user ? user.fullName?.charAt(0).toUpperCase() : "?"}
                </span>
              )}
            </div>

            {/* EMAIL / ETAT */}
            {loadingAuth ? (
              <span>Chargement...</span>
            ) : user ? (
              <span className="max-w-[180px] truncate">{user.email}</span>
            ) : (
              <span>Non connecté</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
