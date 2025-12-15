import React, { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

/* ======================================================
   NORMALISATION DES TRANSACTIONS (ALIGNÉ BACKEND)
====================================================== */
const normalizeTransaction = (tx) => {
  const debitTypes = [
    "WITHDRAWAL",
    "TRANSFER_INTERNAL_DEBIT",
    "TRANSFER_USER_DEBIT",
    "TRANSFER_EXTERNAL",
    "BILL_PAYMENT",
  ];

  const isDebit = debitTypes.includes(tx.type);

  return {
    id: tx._id,
    label:
      tx.description ||
      (tx.type === "DEPOSIT"
        ? "Dépôt"
        : tx.type === "WITHDRAWAL"
        ? "Retrait"
        : tx.type.includes("TRANSFER")
        ? "Transfert"
        : "Transaction"),
    type: tx.type,
    date: tx.createdAt || tx.date,
    status: tx.status || "SUCCESS",
    signedAmount: isDebit ? -tx.amount : tx.amount,
  };
};

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState("toutes");
  const [dateAsc, setDateAsc] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Erreur chargement transactions");

        const data = await res.json();

        const txs = Array.isArray(data?.transactions)
          ? data.transactions.map(normalizeTransaction)
          : [];

        setTransactions(txs);
        setFiltered(txs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  /* ================= FILTRES ================= */
  useEffect(() => {
    let result = [...transactions];

    if (active === "revenus") {
      result = result.filter((t) => t.signedAmount > 0);
    }

    if (active === "depenses") {
      result = result.filter((t) => t.signedAmount < 0);
    }

    if (search) {
      result = result.filter((t) =>
        t.label.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) =>
      dateAsc
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    setFiltered(result);
  }, [active, dateAsc, search, transactions]);

  /* ================= STATS ================= */
  const totalRevenus = transactions
    .filter((t) => t.signedAmount > 0)
    .reduce((sum, t) => sum + t.signedAmount, 0);

  const totalDepenses = transactions
    .filter((t) => t.signedAmount < 0)
    .reduce((sum, t) => sum + Math.abs(t.signedAmount), 0);

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen mt-15 bg-gray-50 p-4">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <p className="text-gray-600">Historique de vos opérations</p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatCard title="Revenus" value={totalRevenus} color="green" />
        <StatCard title="Dépenses" value={totalDepenses} color="red" />
        <StatCard title="Total transactions" value={transactions.length} />
      </div>

      {/* FILTRES */}
      <div className="bg-white p-4 rounded-2xl shadow mt-8 flex flex-wrap gap-4">
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent ml-2 focus:outline-none"
          />
        </div>

        <FilterBtn active={active === "toutes"} onClick={() => setActive("toutes")}>
          Toutes
        </FilterBtn>
        <FilterBtn
          active={active === "revenus"}
          color="green"
          onClick={() => setActive("revenus")}
        >
          Revenus
        </FilterBtn>
        <FilterBtn
          active={active === "depenses"}
          color="red"
          onClick={() => setActive("depenses")}
        >
          Dépenses
        </FilterBtn>

        <button
          onClick={() => setDateAsc(!dateAsc)}
          className="flex items-center gap-2 px-5 py-2 bg-gray-100 rounded-xl"
        >
          <CalendarDaysIcon className="w-5 h-5 focus:bg-gray-900" 
           active={active === "date"}
          color="gray"
          onClick={() => setActive("date")}/>
          Date
        </button>

        <button className="flex items-center gap-2 px-5 py-2 bg-gray-100 rounded-xl">
          <ArrowUpTrayIcon className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow mt-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3">Transaction</th>
              <th className="py-3">Date</th>
              <th className="py-3">Statut</th>
              <th className="py-3 text-right">Montant</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b last:border-none">
                <td className="py-3">{t.label}</td>
                <td className="py-3">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-700 px-3 rounded-full">
                    {t.status}
                  </span>
                </td>
                <td
                  className={`py-3 text-right font-semibold ${
                    t.signedAmount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.signedAmount > 0 ? "+" : "-"}
                  {Math.abs(t.signedAmount).toLocaleString()} XOF
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            Aucune transaction trouvée
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= COMPOSANTS ================= */

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border">
      <p className="text-gray-600">{title}</p>
      <p
        className={`text-3xl font-semibold mt-2 ${
          color === "green"
            ? "text-green-600"
            : color === "red"
            ? "text-red-600"
            : ""
        }`}
      >
        {typeof value === "number"
          ? value.toLocaleString() + " XOF"
          : value}
      </p>
    </div>
  );
}

function FilterBtn({ children, active, onClick, color }) {
  const colors = {
    green: "bg-green-600 text-white",
    red: "bg-red-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-xl ${
        active
          ? colors[color] || "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
