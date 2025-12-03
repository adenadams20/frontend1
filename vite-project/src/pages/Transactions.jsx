import React, { useState } from "react";
import { CalendarDaysIcon, ArrowUpTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Transactions() {
  const [active, setActive] = useState("toutes");
  const [dateAsc, setDateAsc] = useState(true);
  const [dateActive, setDateActive] = useState(false);

  const transactions = [
    
    {
      id: 1,
      icon: "🎬",
      bg: "bg-red-100",
      color: "text-red-500",
      transaction: "Abonnement Netflix",
      categorie: "Dépenses",
      date: "2025-01-20",
      status: "complété",
      montant: "-11 807 FCFA",
    },
    {
      id: 2,
      icon: "💰",
      bg: "bg-green-100",
      color: "text-green-600",
      transaction: "Salaire Novembre",
      categorie: "Revenus",
      date: "2025-01-21",
      status: "complété",
      montant: "+1 639 893 FCFA",
    },
    {
      id: 3,
      icon: "🛒",
      bg: "bg-blue-100",
      color: "text-blue-600",
      transaction: "Carrefour Market",
      categorie: "Dépenses",
      date: "2025-01-02",
      status: "complété",
      montant: "-7 871 FCFA",
    },
    {
      id: 4,
      icon: "⛽",
      bg: "bg-yellow-100",
      color: "text-yellow-600",
      transaction: "Total Essence",
      categorie: "Dépenses",
      date: "2025-01-05",
      status: "complété",
      montant: "-29 518 FCFA",
    },
    {
      id: 5,
      icon: "🎧",
      bg: "bg-purple-100",
      color: "text-purple-600",
      transaction: "Spotify",
      categorie: "Dépenses",
      date: "2025-01-05",
      status: "complété",
      montant: "-196 787 FCFA",
    },
    {
      id: 6,
      icon: "🧑‍💻",
      bg: "bg-teal-100",
      color: "text-teal-600",
      transaction: "Freelance Project",
      categorie: "Revenus",
      date: "2025-01-05",
      status: "complété",
      montant: "+131 191 FCFA",
    },
    {
      id: 7,
      icon: "📦",
      bg: "bg-orange-100",
      color: "text-orange-600",
      transaction: "Amazon",
      categorie: "Dépenses",
      date: "2025-01-05",
      status: "complété",
      montant: "-23 614 FCFA",
    },
    {
      id: 8,
      icon: "🍽️",
      bg: "bg-pink-100",
      color: "text-pink-600",
      transaction: "Restaurant le Bistro",
      categorie: "Dépenses",
      date: "2025-01-05",
      status: "complété",
      montant: "-44 933 FCFA",
    },
    {
      id: 9,
      icon: "💡",
      bg: "bg-gray-100",
      color: "text-gray-700",
      transaction: "EDF",
      categorie: "Dépenses",
      date: "2025-01-05",
      status: "complété",
      montant: "-58 380 FCFA",
    },
    {
      id: 10,
      icon: "🔄",
      bg: "bg-green-100 ",
      color: "text-green-500",
      transaction: "Virement reçu",
      categorie: "Revenus",
      date: "2025-01-05",
      status: "complété",
      montant: "+163 989 FCFA",
    },
  ];

  // FILTRE DES TRANSACTIONS
  let filtered =
    active === "toutes"
      ? transactions
      : active === "revenus"
      ? transactions.filter((t) => t.categorie === "Revenus")
      : transactions.filter((t) => t.categorie === "Dépenses");

  // TRI PAR DATE
  filtered = [...filtered].sort((a, b) => {
    if (dateAsc) return new Date(a.date) - new Date(b.date);
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="min-h-screen bg-gray-100 p-12 max-w-5xl ml-auto">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <p className="text-gray-600 mt-1">Historique complet de vos transactions</p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-300">
          <p className="text-gray-600">Revenus ce mois</p>
          <p className="text-green-600 text-3xl font-semibold mt-2">+3 245 487 XOF</p>
        </div>

        <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-300">
          <p className="text-gray-600">Dépenses ce mois</p>
          <p className="text-red-600 text-3xl font-semibold mt-2">-321 083 XOF</p>
        </div>

        <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-300">
          <p className="text-gray-600">Total transactions</p>
          <p className="text-3xl font-semibold mt-2">{transactions.length}</p>
        </div>
      </div>

      {/* BARRE DE FILTRE */}
      <div className="bg-white p-4 rounded-2xl shadow-md mt-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Recherche */}
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl w-full md:w-1/3">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher une transaction..."
              className="bg-transparent w-full ml-2 focus:outline-none"
            />
          </div>

          {/* FILTRES */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActive("toutes")}
              className={`px-5 py-2 rounded-xl ${
                active === "toutes" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Toutes
            </button>

            <button
              onClick={() => setActive("revenus")}
              className={`px-5 py-2 rounded-xl ${
                active === "revenus" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Revenus
            </button>

            <button
              onClick={() => setActive("depenses")}
              className={`px-5 py-2 rounded-xl ${
                active === "depenses" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Dépenses
            </button>

            {/* TRI PAR DATE */}
            <button
              onClick={() => {
                setDateAsc(!dateAsc);
                setDateActive(!dateActive);
              }}
              className={`px-5 py-2 rounded-xl flex items-center gap-2 ${
                dateActive ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Date
            </button>

            {/* EXPORT */}
            <button className="bg-gray-100 text-gray-700 px-5 py-2 rounded-xl flex items-center gap-2">
              <ArrowUpTrayIcon className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* TABLEAU */}
      <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3"></th>
              <th className="py-3">Transaction</th>
              <th className="py-3">Catégorie</th>
              <th className="py-3">Date</th>
              <th className="py-3">Status</th>
              <th className="py-3">Montant</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b last:border-none">

                {/* ICONE */}
                <td className="py-3">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full ${item.bg}`}>
                    <span className={`text-xl ${item.color}`}>{item.icon}</span>
                  </div>
                </td>

                <td className="py-3">{item.transaction}</td>

                <td className="py-3">
                  <span className="rounded-full py-0 px-2 bg-gray-200 text-gray-700">
                    {item.categorie}
                  </span>
                </td>

                <td className="py-3">{item.date}</td>

                <td className="py-3">
                  <span
                    className={`rounded-full py-0 px-2 ${
                      item.status === "complété"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td
                  className={`py-3 font-semibold ${
                    item.montant.includes("+") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.montant}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
