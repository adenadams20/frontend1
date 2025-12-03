import React from "react";
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
  Cell
} from "recharts";

export default function Dashboard() {
  const cards = [
    { title: "Transfert", icon: ArrowsRightLeftIcon, color: "text-blue-600", link: "/transfert" },
    { title: "Paiement", icon: CreditCardIcon, color: "text-green-500", link: "/paiement" },
    { title: "Historique", icon: ClockIcon, color: "text-purple-500", link: "/historique" },
    { title: "Plus", icon: PlusIcon, color: "text-orange-400", link: "/plus" },
  ];

  const pieData = [
    { name: "Dépenses", value: 3130 },
    { name: "Revenus", value: 5500 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12 pr-12">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="text-gray-600 mb-10">Vue d'ensemble de vos finances</p>

      <section className="bg-gradient-to-red from-blue-500 to-indigo-600 w-full text-white rounded-2xl p-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm opacity-90">Solde Total</p>
            <p className="text-3xl font-semibold mt-2">86 729,25 €</p>

            <div className="flex items-center mt-4 text-sm opacity-90">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l6 6L21 4"></path>
              </svg>
              <span>+12.5% ce mois</span>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:ml-6 flex-1">
            <div className="h-24 lg:h-20 rounded-xl bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* COMPTES */}
      <AccountsCards />

      {/* QUICK ACTIONS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
        {cards.map((c) => (
          <a
            key={c.title}
            href={c.link}
            className="bg-white rounded-xl p-6 shadow-sm border flex items-center gap-4 hover:shadow-lg transition"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <c.icon className={`w-6 h-6 ${c.color}`} />
            </div>
            <p className="text-gray-700">{c.title}</p>
          </a>
        ))}
      </section>

      {/* GRAPHIQUES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LINE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">Revenus vs Dépenses</h2>
          <p className="text-gray-500 mb-4">6 derniers mois</p>

          <LineChart width={450} height={260} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenus" stroke="#22c55e" strokeWidth={3} />
            <Line type="monotone" dataKey="depenses" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">Dépenses par catégorie</h2>
          <p className="text-gray-500 mb-4">Ce mois</p>

          <BarChart width={450} height={260} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </div>
      </div>

      {/* TRANSACTIONS + PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-90 mt-10">

        {/* TRANSACTIONS */}
        <div className="bg-white p-10 w-180 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Transactions Récentes</h2>
            <button className="text-blue-600 hover:underline">Voir tout →</button>
          </div>

          <div className="space-y-6">
            {/* Netflix */}
            <TransactionItem
              icon="🎬"
              bg="bg-purple-100"
              color="text-purple-600"
              title="Netflix"
              subtitle="Abonnement"
              amount="-11 807 FCFA"
              amountColor="text-red-500"
              date="2025-01-20"
            />

            {/* Salaire */}
            <TransactionItem
              icon="💰"
              bg="bg-yellow-100"
              color="text-yellow-500"
              title="Salaire"
              subtitle="Revenu"
              amount="+1 639 893 FCFA"
              amountColor="text-green-600"
              date="2025-01-21"
            />

            {/* Carrefour */}
            <TransactionItem
              icon="🛒"
              bg="bg-blue-100"
              color="text-blue-500"
              title="Carrefour"
              subtitle="Alimentation"
              amount="-7 871 FCFA"
              amountColor="text-red-500"
              date="2025-01-02"
            />

            {/* Essence */}
            <TransactionItem
              icon="⛽"
              bg="bg-red-100"
              color="text-red-500"
              title="Essence"
              subtitle="Transport"
              amount="-29 518 FCFA"
              amountColor="text-red-500"
              date="2025-01-05"
            />
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-white w-100 p-6 rounded-2xl shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Répartition</h2>

          <PieChart width={300} height={300}>
            <Pie data={pieData} cx={150} cy={150} outerRadius={120} dataKey="value">
              <Cell fill="#ef4444" />
              <Cell fill="#22c55e" />
            </Pie>
          </PieChart>

          <div className="mt-6 space-y-2">
            <div className="flex items-center  gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <p className="text-gray-700">Dépenses</p>
              <span className="font-semibold ml-auto">3 130 €</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <p className="text-gray-700">Revenus</p>
              <span className="font-semibold ml-auto">5 500 €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* TRANSACTION ITEM COMPONENT */
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
function AccountsCards() {
  const accounts = [
    { name: "Compte Courant", amount: "12 458,50 €", number: "****1234", icon: CreditCardIcon, gradient: "from-blue-500 to-blue-700" },
    { name: "Compte Épargne", amount: "28 950,00 €", number: "****2234", icon: BanknotesIcon, gradient: "from-green-500 to-green-600" },
    { name: "Compte Business", amount: "45 320,75 €", number: "****3234", icon: BriefcaseIcon, gradient: "from-fuchsia-500 to-purple-600" },
  ];

  return (
    <div className="mt-10">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Mes Comptes</h2>
       
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc, i) => (
          <div key={i} className={`p-6 rounded-2xl text-white bg-gradient-to-red ${acc.gradient} shadow-lg`}>
            <div className="flex justify-between mb-10">
              <acc.icon className="w-10 h-10 text-white" />
              <span className="opacity-80">{acc.number}</span>
            </div>

            <h3 className="text-lg font-medium">{acc.name}</h3>
            <p className="text-3xl font-semibold">{acc.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* DONNÉES GRAPHIQUES */
const lineData = [
  { month: "Jan", revenus: 4000, depenses: 2500 },
  { month: "Fév", revenus: 3000, depenses: 1400 },
  { month: "Mar", revenus: 5000, depenses: 3500 },
  { month: "Avr", revenus: 4500, depenses: 3600 },
  { month: "Mai", revenus: 6000, depenses: 4700 },
  { month: "Jun", revenus: 5500, depenses: 3600 },
];

const barData = [
  { name: "Alimentation", value: 850 },
  { name: "Transport", value: 400 },
  { name: "Logement", value: 1200 },
  { name: "Loisirs", value: 350 },
  { name: "Santé", value: 280 },
];
