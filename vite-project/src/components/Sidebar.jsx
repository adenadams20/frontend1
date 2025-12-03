import { Home, CreditCard, Send, Wallet, Settings, HelpCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 p-6 overflow-y-auto
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Bouton Fermer (mobile only) */}
      <button
        className="md:hidden text-gray-600 mb-4"
        onClick={closeSidebar}
      >
        ✖ Fermer
      </button>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-8">Bank App</h2>

          <nav className="flex flex-col text-gray-700">
            <Link onClick={closeSidebar} to="/dashboard" className="flex items-center gap-3 py-3 px-2 hover:bg-blue-50 rounded-lg">
              <Home /> Dashboard
            </Link>

            <Link onClick={closeSidebar} to="/transactions" className="flex items-center gap-3 py-3 px-2 hover:bg-blue-50 rounded-lg">
              <CreditCard /> Transactions
            </Link>

            <Link onClick={closeSidebar} to="/transfer" className="flex items-center gap-3 py-3 px-2 hover:bg-blue-50 rounded-lg">
              <Send /> Transfert
            </Link>

            <Link onClick={closeSidebar} to="/payment" className="flex items-center gap-3 py-3 px-2 hover:bg-blue-50 rounded-lg">
              <Wallet /> Paiement
            </Link>

            <Link onClick={closeSidebar} to="/settings" className="flex items-center gap-3 py-3 px-2 hover:bg-blue-50 rounded-lg">
              <Settings /> Paramètres
            </Link>

            <Link onClick={closeSidebar} to="/support" className="flex items-center gap-3 py-3 px-2 hover:bg-blue-50 rounded-lg">
              <HelpCircle /> Support
            </Link>
          </nav>
        </div>

        <div>
          <hr className="my-6" />
          <Link onClick={closeSidebar} to="/login" className="flex items-center gap-3 py-3 px-2 hover:bg-red-100 hover:text-red-600 rounded-lg">
            <LogOut /> Déconnexion
          </Link>
        </div>
      </div>
    </aside>
  );
}
