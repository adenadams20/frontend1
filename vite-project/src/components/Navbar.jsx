import { useState } from "react";
import { Menu, X, Moon, Bell, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white-600 text-white p-4 flex items-center justify-between shadow">
      <h1 className="text-xl font-bold">MyBank</h1>

      {/* Bouton menu mobile */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-gray-300">
      </button>

      {/* Barre de recherche + icônes */}
      <div className={`md:flex items-center gap-4 ${open ? "block mt-4" : "hidden"} md:flex`}>
        {/* Barre de recherche */}
        <div className="flex items-center bg-gray-100 text-black rounded-full px-3 py-1 md:w-114 w-full">
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Icône lune */}
        <button className="hover:text-gray-200 text-gray-500">
        </button>

        {/* Icône cloche */}
        <button className="hover:text-gray-200 relative text-gray-500">
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        {/* Cercle profil + email */}
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-black font-bold">
            
          </div>
          <span>bassirou@email.com</span>
        </div>
      </div>
    </nav> 
  );
}
