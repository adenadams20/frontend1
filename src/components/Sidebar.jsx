import { useState, useEffect } from "react";
import { Home, CreditCard, Send, Wallet, Settings, HelpCircle, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(() => {
    return localStorage.getItem("activePath") || location.pathname;
  });

  useEffect(() => {
    localStorage.setItem("activePath", activePath);
  }, [activePath]);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/transactions", label: "Transactions", icon: CreditCard },
    { to: "/transfer", label: "Transfert", icon: Send },
    { to: "/paiement", label: "Paiement", icon: Wallet },
    { to: "/settings", label: "Paramètres", icon: Settings },
    { to: "/faq", label: "Support", icon: HelpCircle },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 z-50 bg-gray-50 shadow-2xl h-screen p-6">
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Weethio</h2>

          <nav className="flex flex-col text-gray-700">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = activePath === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setActivePath(link.to)}
                  className={`flex items-center gap-3 py-3 px-2 rounded-lg transition
                    ${isActive
                      ? "bg-blue-900 text-white"
                      : "hover:bg-blue-200 text-gray-700"
                    }`}
                >
                  <Icon /> {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <hr className="my-6 border-gray-300" />

          <Link
            to="/login"
            className="flex items-center text-red-600 gap-3 py-3 px-2 rounded-lg hover:bg-red-100 transition"
          >
            <LogOut /> Déconnexion
          </Link>
        </div>
      </div>
    </aside>
  );
}
