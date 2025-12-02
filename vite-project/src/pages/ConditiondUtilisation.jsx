import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen  bg-purple-200 ">
      {/* Sidebar */}


      <aside className="w-72 bg-[#312c85] text-white p-6 border-r border-gray-300 h-screen fixed left-0 top-0 overflow-y-auto">
        <Link to="/register">
            <button className="flex items-center gap-2 px-4 py-2 border mb-10 border-white yellow rounded-lg hover:bg-purple-400 transition">
            {/* Logout icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H3m6 6l-6-6 6-6m6 12V6a2 2 0 012-2h3"
                />
            </svg>
            Retour
            </button>
        </Link>

        <h2 className="text-xl font-semibold mb-6">Centre de confidentialité</h2>
        <ul className="space-y-4">
          <li><a href="#politique" className="font-bold underline">Politique de confidentialité</a></li>
          <li><a href="#accueil" className="cursor-pointer hover:underline">Accueil du Centre</a></li>
          <li><a href="#sujets" className="cursor-pointer hover:underline">Sujets liés à la confidentialité</a></li>
          <li><a href="#ressources" className="cursor-pointer hover:underline">Ressources supplémentaires</a></li>
        </ul>

      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto space-y-8 ml-72">

        <section id="politique" className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-3xl font-bold mb-2">Politique de confidentialité</h1>
          <p className="text-sm text-gray-500 mb-4">Mise à jour : 16 décembre 2025</p>
          <p>
            Notre application bancaire utilise vos données afin de fournir des services
            sécurisés, personnalisés et conformes aux réglementations financières. Cette
            mise à jour prendra effet le 16 décembre 2025.
          </p>
        </section>

        <section id="accueil" className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-2xl font-semibold mb-2">
            Qu’est-ce que la Politique de confidentialité et que couvre-t-elle ?
          </h3>
          <p className="text-sm text-gray-500 mb-4">Date effective : 16 juin 2025</p>
          <p>
            Nous souhaitons vous expliquer clairement quelles informations nous
            collectons, comment nous les utilisons et les partageons dans le cadre de
            votre utilisation de notre application bancaire.
          </p>
          <ul className="list-disc ml-6 mt-3 space-y-1">
            <li>Les types d'informations collectées</li>
            <li>Comment et pourquoi nous utilisons vos données</li>
            <li>Avec qui vos informations peuvent être partagées</li>
            <li>Vos droits concernant vos données</li>
            <li>Nos mesures de sécurité</li>
          </ul>
        </section>

        <section id="rechercher" className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-3">Produits couverts par cette Politique</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Application Web Bancaire</li>
            <li>Espace client en ligne sécurisé</li>
            <li>API de gestion bancaire</li>
          </ul>
        </section>

        <section id="sujets" className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-3">Quelles informations recueillons-nous ?</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Informations personnelles : nom, adresse, date de naissance…</li>
            <li>Données bancaires : comptes, transactions, IBAN…</li>
            <li>Données de sécurité : adresses IP, appareils utilisés…</li>
            <li>Données de prévention contre la fraude.</li>
          </ul>
        </section>

        <section id="ressources" className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-3">Comment utilisons-nous vos informations ?</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Gestion et sécurisation de votre compte bancaire</li>
            <li>Authentification et vérification d'identité</li>
            <li>Exécution de transactions bancaires</li>
            <li>Personnalisation de l’interface client</li>
            <li>Détection et prévention de fraude</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-xl shadow mb-10">
          <h3 className="text-xl font-semibold mb-3">Vos droits</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Droit d’accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l’effacement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d’opposition</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
