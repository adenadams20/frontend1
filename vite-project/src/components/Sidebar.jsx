import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg h-screen p-6">

      <div className="flex flex-col flex-grow justify-between">

        {/* Titre */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-8">Bank App</h2>

          {/* NAVIGATION */}
          <nav className="flex flex-col text-gray-700">

            <Link 
              to="/dashboard" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-blue-50 transition  hover:text-blue-600"
            >dashboard
              
             
            </Link>

            <Link 
              to="/transactions" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg  hover:bg-blue-50 transition  hover:text-blue-600"
            >
              Transactions
            </Link>

            <Link 
              to="/transfer" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg  hover:bg-blue-50 transition  hover:text-blue-600"
            >
              Transfert
            </Link>

            <Link 
              to="/payment" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg  hover:bg-blue-50 transition  hover:text-blue-600"
            >
              Paiement
            </Link>

            <Link 
              to="/settings" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg  hover:bg-blue-50 transition  hover:text-blue-600"
            >
              Paramètres
            </Link>

            <Link 
              to="/support" 
              className="flex items-center gap-3 py-3 px-2 rounded-lg  hover:bg-blue-50 transition  hover:text-blue-600"
            >
              Support
            </Link>

          </nav>
        </div>

        {/* LOGOUT */}
        <div>
          <hr className="my-6 border-gray-300" />

          <Link 
            to="/login" 
            className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition"
          >
             Déconnexion
          </Link>
        </div>

      </div>

    </aside>
  );
}
