import { useState } from "react";
import { Menu, X, Moon, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-min-full fixed top-0 w-full md:pr-69  bg-white text-black p-4 flex items-center  justify-between shadow ">
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
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 md:w-64 w-full">
          <Search size={20} className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Icône lune */}
        <button className="text-gray-600 hover:text-gray-900">
          <Moon size={24} />
        </button>

        {/* Icône cloche */}
        <button className="relative text-gray-600 hover:text-gray-900">
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        {/* Profil */}
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">
            B
          </div>
          <span>bassirou@email.com</span>
        </div>
      </div>
    </nav>
  );
}
