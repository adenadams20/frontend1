import { useState } from "react";
import { Menu, X, Moon, Search } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ AJOUT
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import NavbarNotifications from "./NavbarNotifications";

export default function Navbar({ onSidebarToggle }) {
  const [open, setOpen] = useState(false);
  const { user, loadingAuth } = useAuth();
  const navigate = useNavigate(); // ✅ AJOUT

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const goToProfile = () => {
    // ✅ Redirection vers Paramètres -> onglet Profil
    navigate("/settings", { state: { tab: "profil" } });

    // optionnel: fermer le menu mobile
    setOpen(false);
  };

  return (
    <nav className="w-min-full fixed top-0 w-full md:pr-69 bg-[#022b53] z-50 text-yellow p-4 flex items-center justify-end shadow">

      {/* Bouton menu mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-gray-700"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menu desktop + mobile */}
      <div className={`${open ? "block mt-4" : "hidden"} md:flex items-center gap-4`}>
        {/* Barre de recherche */}
        

        {/* Icône lune */}
        <button className="text-white hover:text-gray-300">
          <Moon size={24} />
        </button>

        <NavbarNotifications backendUrl={BACKEND_URL}
        className="text-yellow-100 hover:text-gray-900" />

        {/* ✅ PROFIL DYNAMIQUE (cliquable) */}
        <button
          type="button"
          onClick={goToProfile}
          className="flex items-center gap-2 text-white hover:text-gray-300 px-2 py-1 rounded-lg transition"
        >
          {/* Avatar */}
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

          {/* Email ou état */}
          {loadingAuth ? (
            <span>Chargement...</span>
          ) : user ? (
            <span className="max-w-[180px] truncate">{user.email}</span>
          ) : (
            <span>Non connecté</span>
          )}
        </button>
      </div>
    </nav>
  );
}