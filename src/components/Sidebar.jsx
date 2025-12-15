import { Home, CreditCard, Send, Wallet, Settings, HelpCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg z-50 p-6 overflow-y-auto
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Bouton Fermer (mobile only) */}
      <button
        className="md:hidden text-gray-600 dark:text-white mb-4"
        onClick={closeSidebar}
      >
        ✖ Fermer
      </button>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8">Bank App</h2>

          <nav className="flex flex-col text-gray-700 dark:text-white">
            
            <Link
              onClick={closeSidebar}
              to="/dashboard"
              className="sidebar-link flex items-center gap-3 py-3 px-2 rounded-lg 
                         hover:bg-blue-50 dark:hover:bg-transparent  dark:text-white"
            >
              <Home /> Dashboard
            </Link>

            <Link
              onClick={closeSidebar}
              to="/transactions"
              className="sidebar-link flex items-center gap-3 py-3 px-2 rounded-lg 
                         hover:bg-blue-50 dark:hover:bg-transparent"
            >
              <CreditCard /> Transactions
            </Link>

            <Link
              onClick={closeSidebar}
              to="/transfer"
              className="sidebar-link flex items-center gap-3 py-3 px-2 rounded-lg 
                         hover:bg-blue-50 dark:hover:bg-transparent"
            >
              <Send /> Transfert
            </Link>

            <Link
              onClick={closeSidebar}
              to="/payment"
              className="sidebar-link flex items-center gap-3 py-3 px-2 rounded-lg 
                         hover:bg-blue-50 dark:hover:bg-transparent"
            >
              <Wallet /> Paiement
            </Link>

            <Link
              onClick={closeSidebar}
              to="/settings"
              className="sidebar-link flex items-center gap-3 py-3 px-2 rounded-lg 
                         hover:bg-blue-50 dark:hover:bg-transparent"
            >
              <Settings /> Paramètres
            </Link>

            <Link
              onClick={closeSidebar}
              to="/support"
              className="sidebar-link flex items-center gap-3 py-3 px-2 rounded-lg 
                         hover:bg-blue-50 dark:hover:bg-transparent"
            >
              <HelpCircle /> Support
            </Link>

          </nav>
        </div>

   <Link
  onClick={closeSidebar}
  to="/login"
  className="sidebar-link logout flex items-center gap-3 py-3 px-2 rounded-lg"
>
  <LogOut /> Déconnexion
</Link>

      </div>
    </aside>
  );
}
