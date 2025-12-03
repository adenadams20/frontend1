import React, { useState } from "react";
import { PhoneIcon, EnvelopeIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function CentreAide() {
  const categories = [
    "Toutes",
    "Compte",
    "Transferts",
    "Sécurité",
    "Paiements",
    "Cartes",
    "Application",
  ];

  const questions = [
    {
      category: "Application",
      question: "Comment activer le mode sombre ?",
      answer: "Vous pouvez activer le mode sombre dans les paramètres de votre application.",
    },
    {
      category: "Transferts",
      question: "Quelle est la limite de transfert quotidienne ?",
      answer: "La limite de transfert quotidienne standard est de 3 279 785 Francs CFA.Pour augmenter cette limite, contactez notre service client.",
    },
    {
      category: "Sécurité",
      question: "Comment changer mon mot de passe ?",
      answer: "Rendez-vous dans Paramètres > Sécurité.",
    },
    {
      category: "Compte",
      question: "Comment mettre à jour mes informations ?",
      answer: "Vous pouvez modifier vos informations dans votre profil.",
    },
    {
      category: "Paiements",
      question: "Y a-t-il des frais pour les paiements de factures ?",
      answer: "Non, aucun frais n'est appliqué.",
    },
    {
      category: "Cartes",
      question: "Que faire si ma carte est perdue ou volée ?",
      answer: "Contactez immédiatement notre support.",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredQuestions = questions.filter((q) => {
    const matchCategory = activeCategory === "Toutes" || q.category === activeCategory;
    const matchSearch = q.question.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 max-w-5xl ml-auto">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-3xl font-semibold text-gray-900">Centre d'aide</h1>
        <p className="text-gray-500 mt-2">
          Trouvez des réponses à vos questions ou contactez notre équipe
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Téléphone */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <PhoneIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold">Téléphone</h2>
          <p className="text-gray-500 mt-1">Disponible 24h/24, 7j/7</p>
          <a href="tel:0123456789" className="text-blue-600 font-medium mt-3 inline-block">
            01 23 45 67 89
          </a>
        </div>

        {/* Email */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <EnvelopeIcon className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold">Email</h2>
          <p className="text-gray-500 mt-1">Réponse sous 24h</p>
          <a href="mailto:support@bankapp.com" className="text-blue-600 font-medium mt-3 inline-block">
            support@bankapp.com
          </a>
        </div>

        {/* Chat */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold">Chat en direct</h2>
          <p className="text-gray-500 mt-1">Lun–Ven, 9h–18h</p>
          <a href="/chat" className="text-blue-600 font-medium mt-3 inline-block">
            Démarrer le chat
          </a>
        </div>

      </div>

      {/* FAQ */}
      <div className="max-w-5xl mx-auto mt-16 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">

        <h2 className="text-2xl font-semibold mb-6">Questions fréquentes (FAQ)</h2>

        {/* SEARCH */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
          <input
            type="text"
            placeholder="Rechercher une question..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* QUESTIONS */}
        <div className="space-y-4">
          {filteredQuestions.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:shadow transition">
              <div
                className="flex justify-between items-center cursor-pointer gap-4"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="px-3 py-1 text-xs rounded-lg bg-gray-100 text-gray-600">
                  {item.category}
                </span>

                <h3 className="text-lg font-medium flex-1">{item.question}</h3>

                {openIndex === idx ? (
                  <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                )}
              </div>

              {openIndex === idx && (
                <p className="mt-4 text-gray-600">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FORMULAIRE */}
     <div className="max-w-5xl mx-auto mt-16 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
  
  <h2 className="text-2xl font-semibold text-center mb-4">Contactez-nous</h2>
  <p className="text-gray-600 text-center mb-6">
    Remplissez ce formulaire pour envoyer un message
  </p>

  <form className="space-y-4">

    {/* NOM + EMAIL SUR LA MÊME LIGNE */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block font-medium text-gray-700">Nom</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
        />
      </div>
      <div className="col-span-2">
  <label className="block font-medium text-gray-700">Sujet</label>
  <input
    type="text"
    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
  />
</div>
    </div>

    {/* MESSAGE */}
    <div>
      <label className="block font-medium text-gray-700">Message</label>
      <textarea
        rows="4"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
      ></textarea>
    </div>

    {/* BOUTON */}
    <button
  type="submit"
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl text-lg transition-all"
>
  <PaperAirplaneIcon className="w-5 h-5 text-white rotate-45" />
  Envoyer le message
</button>

  </form>
</div>


    </div>
  );
}

