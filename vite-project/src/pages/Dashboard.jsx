import React from 'react'
import { 
  ArrowsRightLeftIcon, 
  CreditCardIcon, 
  ClockIcon, 
  PlusIcon,
  BanknotesIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {

  const cards = [
  { title: 'Transfert', icon: ArrowsRightLeftIcon, color: 'text-blue-600', link: '/transfert' },
  { title: 'Paiement', icon: CreditCardIcon, color: 'text-green-500', link: '/paiement' },
  { title: 'Historique', icon: ClockIcon, color: 'text-purple-500', link: '/historique' },
  { title: 'Plus', icon: PlusIcon, color: 'text-orange-400', link: '/plus' },
];


  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12 pr-12 font-sans text-gray-800">
      <header className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-1">Dashboard</h1>
        <p className="text-gray-500 mb-6">Vue d'ensemble de vos finances</p>
      </header>

      <main className="max-w-7xl mx-auto space-y-10">

        {/* ------------ HERO CARD ------------ */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-md">
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

        {/* ------------ ACTION CARDS ------------ */}
       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
  {cards.map((c) => (
    <a
      key={c.title}
      href={c.link}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-lg transition cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
        <c.icon className={`w  -6 h-6 ${c.color}`} />
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-600">{c.title}</p>
      </div>
    </a>
  ))}
</section>


        {/* ------------ MES COMPTES ------------ */}
        <AccountsCards />

      </main>
    </div>
  );
}

/* ------------------------------------------------------------- */
/* ------------------ Account Cards Component ------------------ */
/* ------------------------------------------------------------- */

function AccountsCards() {

  const accounts = [
    {
      name: "Compte Courant",
      amount: "12 458,50 €",
      number: "****1234",
      icon: CreditCardIcon,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      name: "Compte Épargne",
      amount: "28 950,00 €",
      number: "****2234",
      icon: BanknotesIcon,
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Compte Business",
      amount: "45 320,75 €",
      number: "****3234",
      icon: BriefcaseIcon,
      gradient: "from-fuchsia-500 to-purple-600",
    },
  ];

  return (
    <div className="px-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Mes Comptes</h2>
        <button className="text-blue-600 hover:underline">Voir tout</button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl text-white bg-gradient-to-r ${acc.gradient} shadow-lg`}
          >
            {/* Top: Icon + Number */}
            <div className="flex justify-between mb-10">
              <acc.icon className="w-10 h-10 text-white" />
              <span className="text-white opacity-80">{acc.number}</span>
            </div>

            {/* Bottom: Name + Amount */}
            <h3 className="text-lg font-medium mb-2">{acc.name}</h3>
            <p className="text-3xl font-semibold">{acc.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
