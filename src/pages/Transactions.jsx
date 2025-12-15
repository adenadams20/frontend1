import React, { useState, useEffect } from "react";
import { CalendarDaysIcon, ArrowUpTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import InputField from "../components/InputField";

export default function Transactions() {
  const [active, setActive] = useState("toutes");
  const [dateAsc, setDateAsc] = useState(true);
  const [dateActive, setDateActive] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token"); // récupère le token JWT

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Erreur fetch transactions : ${res.status}`);
        const data = await res.json();
        setTransactions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

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

  if (loading) return <p className="p-6">Chargement des transactions...</p>;
  if (error) return <p className="p-6 text-red-500">Erreur : {error}</p>;

  return (
    <div className="min-h-screen mt-20 bg-gray-50  md:p-2 ">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <p className="text-gray-600 mt-1">Historique complet de vos transactions</p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-300">
          <p className="text-gray-600">Revenus ce mois</p>
          <p className="text-green-600 text-3xl font-semibold mt-2">
            {filtered
              .filter((t) => t.categorie === "Revenus")
              .reduce((sum, t) => sum + parseFloat(t.montant.replace(/[^0-9.-]+/g, "")), 0)
              .toLocaleString()}{" "}
            XOF
          </p>
        </div>

        <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-300">
          <p className="text-gray-600">Dépenses ce mois</p>
          <p className="text-red-600 text-3xl font-semibold mt-2">
            {filtered
              .filter((t) => t.categorie === "Dépenses")
              .reduce((sum, t) => sum + parseFloat(t.montant.replace(/[^0-9.-]+/g, "")), 0)
              .toLocaleString()}{" "}
            XOF
          </p>
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
            <InputField
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
