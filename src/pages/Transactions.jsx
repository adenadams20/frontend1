import React, { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

/* ======================================================
   localStorage – IDS SUPPRIMÉS
====================================================== */
const getDeletedIds = () =>
  JSON.parse(localStorage.getItem("deletedTransactionIds")) || [];

const saveDeletedIds = (ids) =>
  localStorage.setItem("deletedTransactionIds", JSON.stringify(ids));

/* ======================================================
   NORMALISATION TRANSACTION
====================================================== */
const normalizeTransaction = (tx) => {
  if (!tx) return null;

  const debitTypes = [
    "WITHDRAWAL",
    "TRANSFER_INTERNAL_DEBIT",
    "TRANSFER_USER_DEBIT",
    "TRANSFER_EXTERNAL",
    "TRANSFER_OUT",
    "P2P_SEND",
    "PAYMENT",
    "BILL_PAYMENT",
    "BILL_PAY",
  ];

  const isDebit = debitTypes.includes(tx.type);

  let label = tx.description || "";

  if (!label) {
    switch (tx.type) {
      case "DEPOSIT":
      case "TRANSFER_IN":
      case "P2P_RECEIVE":
        label = "Entrée";
        break;
      case "WITHDRAWAL":
        label = "Retrait";
        break;
      case "TRANSFER_INTERNAL_DEBIT":
      case "TRANSFER_USER_DEBIT":
      case "TRANSFER_EXTERNAL":
      case "TRANSFER_OUT":
      case "P2P_SEND":
        label = "Transfert";
        break;
      case "PAYMENT":
      case "BILL_PAYMENT":
      case "BILL_PAY":
        label = tx.serviceName || "Paiement";
        break;
      default:
        label = "Transaction";
    }
  }

  return {
    id: tx._id,
    label,
    type: tx.type,
    date: tx.createdAt || tx.date || new Date().toISOString(),
    status: tx.status || "SUCCESS",
    signedAmount: isDebit ? -Number(tx.amount) : Number(tx.amount),
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [txToDelete, setTxToDelete] = useState(null);

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
        const deletedIds = getDeletedIds();

        const txs = Array.isArray(data?.transactions)
          ? data.transactions
              .map(normalizeTransaction)
              .filter(Boolean)
              .filter((t) => !deletedIds.includes(t.id))
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

    if (active === "revenus") result = result.filter((t) => t.signedAmount > 0);
    if (active === "depenses") result = result.filter((t) => t.signedAmount < 0);
    if (search)
      result = result.filter((t) =>
        t.label.toLowerCase().includes(search.toLowerCase())
      );

    result.sort((a, b) =>
      dateAsc
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    setFiltered(result);
    setCurrentPage(1); // reset page quand filtre change
  }, [active, dateAsc, search, transactions]);

  /* ================= SUPPRESSION ================= */
  const handleDelete = (id) => {
    setTxToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const deletedIds = getDeletedIds();
    saveDeletedIds([...deletedIds, txToDelete]);

    const updated = transactions.filter((t) => t.id !== txToDelete);
    setTransactions(updated);
    setFiltered(updated);

    setShowDeleteModal(false);
    setTxToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTxToDelete(null);
  };

  /* ================= STATS ================= */
  const totalRevenus = transactions
    .filter((t) => t.signedAmount > 0)
    .reduce((sum, t) => sum + t.signedAmount, 0);

  const totalDepenses = transactions
    .filter((t) => t.signedAmount < 0)
    .reduce((sum, t) => sum + Math.abs(t.signedAmount), 0);

  /* ================= PAGINATION ================= */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTransactions = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-yellow-100 mt-20 p-4">
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Supprimer la transaction
            </h2>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette transaction ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-xl bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-white"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold">Transactions</h1>

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
          <CalendarDaysIcon className="w-5 h-5" />
          Date
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="text-gray-500">
            <tr>
              <th className="py-4 font-medium">Transaction</th>
              <th className="py-4 font-medium">Date</th>
              <th className="py-4 font-medium">Statut</th>
              <th className="py-4 text-right font-medium">Montant</th>
              <th className="py-4 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentTransactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4">{t.label}</td>
                <td className="py-4">{new Date(t.date).toLocaleDateString()}</td>
                <td className="py-4">
                  <span className="bg-green-100 text-green-700 px-3 rounded-full">
                    {t.status}
                  </span>
                </td>
                <td
                  className={`py-4 text-right font-semibold ${
                    t.signedAmount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.signedAmount > 0 ? "+" : "-"}
                  {Math.abs(t.signedAmount).toLocaleString()} XOF
                </td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Supprimer"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400">
                  Aucune transaction trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= COMPOSANTS ================= */
function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
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
