import React, { useEffect, useState } from "react";
import {
  ArrowsRightLeftIcon,
  CreditCardIcon,
  ClockIcon,
  PlusIcon,
  BanknotesIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/**
 * Dashboard (version optimisée)
 * - récupère transactions, comptes et charts depuis le backend
 * - mappe les comptes backend (type/balance/_id) vers le format attendu par le rendu
 * - garde EXACTEMENT le même rendu visuel que ton code précédent
 */

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]); // comptes mappés pour le front
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // helper : si backend renvoie "balance" number ou "amount" string, on normalise
  const normalizeAccount = (acc) => {
    // acc can be like: { _id, type, balance } or { _id, amount, number, ... }
    const type = (acc.type || "").toLowerCase();
    const balanceNumber =
      typeof acc.balance === "number"
        ? acc.balance
        : typeof acc.amount === "number"
        ? acc.amount
        : typeof acc.amount === "string"
        ? parseFloat(acc.amount.replace(/[^0-9.-]+/g, "")) || 0
        : 0;

    // mapping for visuals (icon, gradient, readable name)
    const map = {
      courant: {
        name: "Compte Courant",
        icon: CreditCardIcon,
        gradient: "from-blue-500 to-indigo-600",
      },
      epargne: {
        name: "Compte Épargne",
        icon: BanknotesIcon,
        gradient: "from-green-500 to-teal-600",
      },
      business: {
        name: "Compte Business",
        icon: BriefcaseIcon,
        gradient: "from-purple-500 to-pink-600",
      },
    };

    const cfg = map[type] || {
      name: acc.name || "Compte",
      icon: CreditCardIcon,
      gradient: "from-gray-500 to-gray-700",
    };

    return {
      _id: acc._id,
      type,
      name: cfg.name,
      number: acc.number || (acc._id ? "**** " + String(acc._id).slice(-4) : "****"),
      amount: (balanceNumber || 0).toLocaleString(), // displayed like "12,345"
      amountRaw: balanceNumber, // numeric raw for sums
      icon: cfg.icon,
      gradient: cfg.gradient,
      // keep original in case you need other fields
      __raw: acc,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // transactions
        const resTrans = await fetch("http://localhost:5000/api/transactions", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!resTrans.ok) {
          const text = await resTrans.text().catch(() => resTrans.statusText);
          throw new Error(`Transactions fetch failed: ${resTrans.status} ${text}`);
        }
        const dataTrans = await resTrans.json();
        // ensure array and map amounts to strings used by UI
        const txs = Array.isArray(dataTrans)
          ? dataTrans.map((t) => ({
              id: t._id || t.id,
              icon: t.icon || "💰",
              bg: t.bg || "bg-blue-100",
              color: t.color || "text-blue-500",
              title: t.title || t.description || t.label || "Transaction",
              subtitle: t.subtitle || t.category || "",
              amount: typeof t.amount === "number" ? (t.amount > 0 ? `+${t.amount.toLocaleString()}` : `${t.amount.toLocaleString()}`) : t.amount || "",
              date: t.date ? t.date.slice(0, 10) : t.createdAt ? t.createdAt.slice(0, 10) : "",
            }))
          : [];
        setTransactions(txs);

        // accounts
        const resAcc = await fetch("http://localhost:5000/api/accounts", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!resAcc.ok) {
          const text = await resAcc.text().catch(() => resAcc.statusText);
          throw new Error(`Accounts fetch failed: ${resAcc.status} ${text}`);
        }
        const dataAcc = await resAcc.json();
        const mappedAccounts = Array.isArray(dataAcc)
          ? dataAcc.map((a) => normalizeAccount(a))
          : [];
        setAccounts(mappedAccounts);

        // charts
        const resCharts = await fetch("http://localhost:5000/api/charts", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!resCharts.ok) {
          const text = await resCharts.text().catch(() => resCharts.statusText);
          throw new Error(`Charts fetch failed: ${resCharts.status} ${text}`);
        }
        const chartsJson = await resCharts.json();
        // support previously used format { line, bar, pie } or direct arrays
        setLineData(Array.isArray(chartsJson.line) ? chartsJson.line : chartsJson.lineData || []);
        setBarData(Array.isArray(chartsJson.bar) ? chartsJson.bar : chartsJson.barData || []);
        // for pie, ensure each entry has color or colorClass for rendering
        const pieSource = Array.isArray(chartsJson.pie) ? chartsJson.pie : chartsJson.pieData || [];
        const normalizedPie = pieSource.map((p, i) => ({
          name: p.name || `Part ${i + 1}`,
          value: typeof p.value === "number" ? p.value : Number(p.value) || 0,
          color: p.color, // optional hex
          colorClass: p.colorClass, // optional tailwind class
        }));
        setPieData(normalizedPie);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Erreur serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const cards = [
    { title: "Transfert", icon: ArrowsRightLeftIcon, color: "text-blue-600", link: "/transfer" },
    { title: "Paiement", icon: CreditCardIcon, color: "text-green-500", link: "/paiement" },
    { title: "Historique", icon: ClockIcon, color: "text-purple-500", link: "/transactions" },
    { title: "Plus", icon: PlusIcon, color: "text-orange-400", link: "/plus" },
  ];

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-500">Erreur : {error}</p>;

  // compute total safely (use amountRaw numeric)
  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.amountRaw || 0), 0);

  return (
    <div className="min-h-screen mt-20 bg-gray-50 px-3 md:p-2">
      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
      <p className="text-gray-600 mb-10">Vue d'ensemble de vos finances</p>

      {/* SOLDE TOTAL */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 w-full text-white rounded-2xl p-6 md:p-8 shadow-md mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-sm opacity-90">Solde Total</p>
< HEAD
            <p className="text-3xl font-semibold mt-2">86 729,25 XOF</p>


            <p className="text-3xl font-semibold mt-2">
              {Number.isFinite(totalBalance) ? totalBalance.toLocaleString() : "0"} €
            </p>

            <div className="flex items-center mt-4 text-sm opacity-90">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l6 6L21 4"></path>
              </svg>
              <span>+12.5% ce mois</span>
            </div>
          </div>
          <div className="flex-1 mt-6 lg:mt-0">
            <div className="h-20 md:h-24 rounded-xl bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* COMPTES */}
      <AccountsCards accounts={accounts} />

      {/* QUICK ACTIONS */}
      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 my-10">
        {cards.map((c) => (
          <a
            key={c.title}
            href={c.link}
            className="bg-white rounded-xl p-4 md:p-6 shadow-sm flex items-center gap-3 hover:shadow-lg transition"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <c.icon className={`w-5 h-5 md:w-6 md:h-6 ${c.color}`} />
            </div>
            <p className="text-gray-700 text-sm md:text-base">{c.title}</p>
          </a>
        ))}
      </section>

      {/* GRAPHIQUES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LINE CHART */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow w-full overflow-x-auto">
          <h2 className="text-lg md:text-xl font-semibold">Revenus vs Dépenses</h2>
          <p className="text-gray-500 mb-4 text-sm">6 derniers mois</p>
          <div className="min-w-[320px]">
            <LineChart width={500} height={260} data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenus" stroke="#22c55e" strokeWidth={3} />
              <Line type="monotone" dataKey="depenses" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow w-full overflow-x-auto">
          <h2 className="text-lg md:text-xl font-semibold">Dépenses par catégorie</h2>
          <p className="text-gray-500 mb-4 text-sm">Ce mois</p>
          <div className="min-w-[320px] ">
            <BarChart width={500} height={260} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS + PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* TRANSACTIONS */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Transactions Récentes</h2>
          </div>
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <TransactionItem
                key={t.id}
                icon={t.icon || "💰"}
                bg={t.bg || "bg-blue-100"}
                color={t.color || "text-blue-500"}
                title={t.title}
                subtitle={t.subtitle}
                amount={t.amount}
                amountColor={t.amount?.startsWith("-") ? "text-red-500" : "text-green-600"}
                date={t.date}
              />
            ))
          ) : (
            <p>Aucune transaction récente</p>
          )}
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center w-full">
          <h2 className="text-xl font-semibold mb-4">Répartition</h2>

          <PieChart width={250} height={250}>
            <Pie data={pieData} cx={125} cy={125} outerRadius={110} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || (index === 0 ? "#ef4444" : "#22c55e")} />
              ))}
            </Pie>
          </PieChart>

          <div className="mt-6 w-full space-y-2">
            {pieData.map((entry, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${entry.colorClass || (i === 0 ? "bg-red-500" : "bg-green-500")}`}></span>
                <p className="text-gray-700">{entry.name}</p>
                <span className="font-semibold ml-auto">{(entry.value || 0).toLocaleString()} XOF</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* TRANSACTION ITEM */
function TransactionItem({ icon, bg, color, title, subtitle, amount, amountColor, date }) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center`}>
          <span className={`${color} text-xl`}>{icon}</span>
        </div>
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="text-right">
        <p className={`${amountColor} font-semibold`}>{amount}</p>
        <p className="text-gray-400 text-sm">{date}</p>
      </div>
    </div>
  );
}

/* COMPTES */
< HEAD
function AccountsCards() {
  const accounts = [
    { name: "Compte Courant", amount: "122 458,50 XOF", number: "****1234", icon: CreditCardIcon, gradient: "from-blue-500 to-blue-700" },
    { name: "Compte Épargne", amount: "2 581 950,00 XOF", number: "****2234", icon: BanknotesIcon, gradient: "from-green-500 to-green-600" },
    { name: "Compte Business", amount: "45 320,75 XOF", number: "****3234", icon: BriefcaseIcon, gradient: "from-fuchsia-500 to-purple-600" },
  ];

=======
function AccountsCards({ accounts }) {
  // accounts already mapped by Dashboard (name, amount, number, icon, gradient)

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Mes Comptes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc, i) => {
          const IconComp = acc.icon || CreditCardIcon;
          return (
            <div key={i} className={`p-6 rounded-2xl text-white bg-gradient-to-r ${acc.gradient} shadow-lg`}>
              <div className="flex justify-between mb-10">
                <IconComp className="w-10 h-10 text-white" />
                <span className="opacity-80">{acc.number}</span>
              </div>
              <h3 className="text-lg font-medium">{acc.name}</h3>
              <p className="text-3xl font-semibold">{acc.amount} XOF</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
