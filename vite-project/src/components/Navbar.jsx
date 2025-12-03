import { Menu, Moon, Bell } from "lucide-react";

export default function Navbar({ openSidebar }) {
  return (
    <nav className="
      fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow 
      flex items-center justify-between px-6 z-30
    ">
      <h1 className="text-xl font-bold">MyBank</h1>

      {/* Bouton Menu mobile */}
      <button 
        onClick={openSidebar} 
        className="md:hidden text-gray-600"
      >
        <Menu size={28} />
      </button>

      {/* Icônes (desktop seulement) */}
      <div className="hidden md:flex items-center gap-4">

        <button className="text-gray-600 hover:text-gray-800">
          <Moon size={24} />
        </button>

        <button className="relative text-gray-600 hover:text-gray-800">
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <span>bassirou@email.com</span>
        </div>

      </div>
    </nav>
  );
}
