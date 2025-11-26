import { Home, CreditCard, Send, Wallet, Settings, HelpCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg h-screen p-6 
                      fixed left-0 top-0 z-40 overflow-y-auto">

      <div className="flex flex-col flex-grow justify-between">

        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-8">Bank App</h2>

          <nav className="flex flex-col text-gray-700">

            <Link 
              to="/dashboard" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-blue-50 transition hover:text-blue-600"
            >
              <Home /> Dashboard
            </Link>

            <Link 
              to="/transactions" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-blue-50 transition hover:text-blue-600"
            >
              <CreditCard /> Transactions
            </Link>

            <Link 
              to="/transfer" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-blue-50 transition hover:text-blue-600"
            >
              <Send /> Transfert
            </Link>

            <Link 
              to="/payment" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-blue-50 transition hover:text-blue-600"
            >
              <Wallet /> Paiement
            </Link>

            <Link 
              to="/settings" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-blue-50 transition hover:text-blue-600"
            >
              <Settings /> Paramètres
            </Link>

            <Link 
              to="/support" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-blue-50 transition hover:text-blue-600"
            >
              <HelpCircle /> Support
            </Link>

          </nav>
        </div>

        <div>
          <hr className="my-6 border-gray-300" />

          <Link 
            to="/login" 
            className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition"
          >
            <LogOut /> Déconnexion
          </Link>
        </div>

      </div>

    </aside>
  );
}
