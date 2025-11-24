import { Home, CreditCard, Send, Settings, HelpCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg h-screen p-6 border-r gap-6">
      <h2 className="text-2xl font-bold text-blue-600">Menu</h2>
      <nav className="flex flex-col gap-4 text-gray-700">
        <Link to="/dashboard" className="flex items-center gap-3 hover:text-blue-600"><Home/> Dashboard</Link>
        <Link to="/transactions" className="flex items-center gap-3 hover:text-blue-600"><CreditCard/> Transactions</Link>
        <Link to="/transfer-internal" className="flex items-center gap-3 hover:text-blue-600"><Send/> Transfert interne</Link>
        <Link to="/transfer-external" className="flex items-center gap-3 hover:text-blue-600"><Send/> Transfert externe</Link>
        <Link to="/settings" className="flex items-center gap-3 hover:text-blue-600"><Settings/> Paramètres</Link>
        <Link to="/faq" className="flex items-center gap-3 hover:text-blue-600"><HelpCircle/> FAQ</Link>
        <Link to="/login" className="flex items-center gap-3 hover:text-red-600 mt-6"><LogOut/> Déconnexion</Link>
      </nav>
    </aside>
  );
}
