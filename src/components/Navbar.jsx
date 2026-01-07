import { useState } from "react";
import { Menu, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavbarNotifications from "./NavbarNotifications";

export default function Navbar({ onSidebarToggle }) {
  const { user, loadingAuth } = useAuth();
  const navigate = useNavigate();

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const goToProfile = () => {
    navigate("/settings", { state: { tab: "profil" } });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#022b53] text-white shadow">
      <div className="flex items-center justify-between p-4 md:ml-64 md:pl-0">

        <div>
          {/* 🔥 TOGGLE SIDEBAR (MOBILE) */}
        <button
          onClick={onSidebarToggle}
          className="md:hidden"
        >
          <Menu size={28} />
        </button>
        </div>

        {/* ACTIONS NAVBAR */}
        <div className="flex items-center justify-end  gap-4">

          {/* DARK MODE (optionnel) */}
          <button className="hover:text-gray-300">
            <Moon size={24} />
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
