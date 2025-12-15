import { useState, useEffect } from "react";
import { Menu, Moon, Sun, Bell } from "lucide-react";

export default function Navbar({ openSidebar }) {
  const [darkMode, setDarkMode] = useState(false);

  // Applique la classe dark-mode sur tout le body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <nav
      className={`fixed top-0 left-0 md:left-64 right-0 h-16 shadow flex items-center justify-between px-6 z-30
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
      `}
    >
      <h1 className="text-xl font-bold">MyBank</h1>

      {/* Bouton Menu mobile */}
      <button onClick={openSidebar} className="md:hidden">
        <Menu size={28} className={darkMode ? "text-white" : "text-gray-600"} />
      </button>

      {/* Icônes (desktop seulement) */}
      <div className="hidden md:flex items-center gap-4">
        {/* Bouton mode sombre / clair */}
       <button
  onClick={() => setDarkMode(!darkMode)}
  className={darkMode ? "text-yellow-300" : "text-gray-600 hover:text-gray-800"}
>
  {darkMode ? (
    <Sun size={24} />     // Icône en mode sombre
  ) : (
    <Moon size={24} />    // Icône en mode clair
  )}
</button>


        {/* Icône cloche */}
        <button className="relative">
          <Bell size={24} className={darkMode ? "text-white" : "text-gray-600"} />
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        {/* Profil */}
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              darkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            B
          </div>
          <span>{darkMode ? "bassirou@dark.com" : "bassirou@email.com"}</span>
        </div>
      </div>
    </nav>
  );
}