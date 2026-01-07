import { useState, useEffect } from "react";
import {
  Home,
  CreditCard,
  Send,
  Wallet,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [activePath, setActivePath] = useState(
    localStorage.getItem("activePath") || location.pathname
  );

  useEffect(() => {
    setActivePath(location.pathname);
    localStorage.setItem("activePath", location.pathname);
  }, [location.pathname]);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/transactions", label: "Transactions", icon: CreditCard },
    { to: "/transfer", label: "Transfert", icon: Send },
    { to: "/paiement", label: "Paiement", icon: Wallet },
    { to: "/cards", label: "Carte", icon: CreditCard },
    { to: "/settings", label: "Paramètres", icon: Settings },
    { to: "/faq", label: "Support", icon: HelpCircle },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 dark:bg-gray-100 shadow-2xl z-50 p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-8 text-[#022b53]">WECCO</h2>

            <nav className="flex flex-col gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = activePath === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => {
                      setActivePath(link.to);
                      onClose(); // 👈 ferme en mobile
                    }}
                    className={`flex items-center gap-3 py-3 px-3 rounded-lg transition
                      ${
                        isActive
                          ? "bg-[#022b53] text-white"
                          : "text-[#022b53] hover:bg-gray-100"
                      }`}
                  >
                    <Icon size={20} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <hr className="my-6" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-600 py-3 px-3 rounded-lg hover:bg-red-100 w-full"
            >
              <FiLogOut size={20} />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
