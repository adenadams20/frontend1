import { useState } from "react";
import { Menu, X, Moon, Bell, Search } from "lucide-react";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { Link } from "lucide-react";

export default function Navbar({ onSidebarToggle }) {
  const [open, setOpen] = useState(false);
  const { user, loadingAuth } = useAuth();

  return (
    <nav className="w-min-full fixed top-0 w-full md:pr-69 bg-white z-50 text-black p-4 flex items-center justify-between shadow">
      <h1 className="text-xl font-bold">MyBank</h1>

      {/* Bouton menu mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-gray-700"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menu desktop + mobile */}
      <div
        className={`${
          open ? "block mt-4" : "hidden"
        } md:flex items-center gap-4`}
      >
        {/* Barre de recherche */}
       

        {/* Icône lune */}
        <Button className="text-gray-600 hover:text-gray-900">
          <Moon size={24} />
        </Button>

        {/* Icône cloche */}
        <button className="relative text-gray-600 hover:text-gray-900">
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        {/*  PROFIL DYNAMIQUE */}
        <div className="flex items-center shadow p-2 rounded-2xl bg-blue-800 gap-2 text-white"  >
          {/* Avatar dans la Navbar */}
<div className="w-8 h-8 rounded-full overflow-hidden  bg-gray-200 flex items-center justify-center">
  {user?.avatarUrl ? (
    <img
      src={`http://localhost:5000${user.avatarUrl}`}
      alt="avatar"
      className="w-full h-full object-cover"
      Link to="/settings"
      
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
            <span>{user.email}</span>
          ) : (
            <span>Non connecté</span>
          )}
        </div>
      </div>
    </nav>
  );
}
