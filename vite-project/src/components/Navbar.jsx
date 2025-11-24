import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex items-center justify-between shadow">
      <h1 className="text-xl font-bold">MyBank</h1>
      <button onClick={() => setOpen(!open)} className="md:hidden">
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>
      <div className={`md:flex gap-6 font-medium ${open ? "block mt-4" : "hidden"} md:block`}>
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/transactions" className="hover:text-gray-300">Transactions</Link>
        <Link to="/settings" className="hover:text-gray-300">Settings</Link>
      </div>
    </nav>
  );
}
