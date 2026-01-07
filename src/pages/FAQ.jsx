import React, { useState, useEffect } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import InputField from "../components/InputField";
// import Button from "../components/Button";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function FAQ() {
  /* =========================
     🔹 FORMULAIRE CONTACT
  ========================= */
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [status, setStatus] = useState({
    type: "", // "success" | "error" | "loading"
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ type: "loading", message: "Envoi du message..." });

    const token = localStorage.getItem("token");

    if (!token) {
      setStatus({
        type: "error",
        message: "Vous devez être connecté pour contacter le support.",
      });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data.message || "Une erreur est survenue.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Message envoyé avec succès. Notre équipe vous répondra.",
      });

      setForm({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setStatus({ type: "", message: "" }), 4000);
    } catch (err) {
      setStatus({
        type: "error",
        message: "Erreur réseau. Veuillez réessayer.",
      });
    }
  };

  /* =========================
     🔹 FAQ DATA
  ========================= */
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
      answer:
        "Vous pouvez activer le mode sombre dans les paramètres de votre application.",
    },
    {
      category: "Transferts",
      question: "Quelle est la limite de transfert quotidienne ?",
      answer:
        "La limite standard est de 3 279 785 FCFA. Pour l’augmenter, contactez le support.",
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
      answer: "Non, aucun frais n’est appliqué.",
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
    const matchCategory =
      activeCategory === "Toutes" || q.category === activeCategory;
    const matchSearch = q.question.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  /* =========================
     🔹 ELFSIGHT AI CHATBOT
  ========================= */
  useEffect(() => {
    const scriptId = "elfsight-platform";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // cacher la bulle (souvent injectée dans <body>)
    const hideBubble = () => {
      const toolbar =
        document.querySelector(".eapps-widget-toolbar") ||
        document.querySelector('[class*="eapps-widget-toolbar"]');
      if (toolbar) toolbar.style.display = "none";
    };

    const t = setInterval(hideBubble, 300);
    setTimeout(() => clearInterval(t), 8000);

    return () => clearInterval(t);
  }, []);

  const openElfsightChat = () => {
    const start = Date.now();

    const interval = setInterval(() => {
      // bouton d'ouverture du chat (selon widget)
      const btn =
        document.querySelector('[aria-label*="chat" i]') ||
        document.querySelector('[class*="eapps-widget-toolbar"] button') ||
        document.querySelector('button[class*="eapps"]');

      if (btn && typeof btn.click === "function") {
        btn.click();
        clearInterval(interval);
        return;
      }

      if (Date.now() - start > 10000) {
        clearInterval(interval);
        console.warn("Elfsight: bouton d’ouverture introuvable.");
      }
    }, 250);
  };

  return (
    <div className="min-h-screen  py-12 mt-10 px-4 w-full ml-auto">
      {/* =========================
          HEADER
      ========================= */}
      <div className="text-center mb-14">
        <h1 className="text-3xl font-semibold ">Centre d'aide</h1>
        <p className=" mt-2">
          Trouvez des réponses à vos questions ou contactez notre équipe
        </p>
      </div>

      {/* =========================
          CARDS CONTACT
      ========================= */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Téléphone */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <PhoneIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold">Téléphone</h2>
          <p className="text-gray-500 mt-1">Disponible 24h/24</p>
          <a
            href="tel:775333945"
            className="text-blue-600 font-medium mt-3 inline-block"
          >
            77 533 39 45
          </a>
        </div>

        {/* Email */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <EnvelopeIcon className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold">Email</h2>
          <p className="text-gray-500 mt-1">Réponse sous 24h</p>
          <span className="text-blue-600 font-medium mt-3 inline-block">
            collefall118@gmail.com
          </span>
        </div>

        {/* Chat */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold">Chat en direct</h2>
          <p className="text-gray-500 mt-1">Lun–Ven, 9h–18h</p>

          <button
            type="button"
            onClick={openElfsightChat}
            className="text-blue-600 font-medium mt-3 inline-block cursor-pointer"
          >
            Démarrer le chat
          </button>
        </div>
      </div>

      {/* =========================
          FAQ
      ========================= */}
      <div className="max-w-5xl mx-auto mt-16 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6">
          Questions fréquentes (FAQ)
        </h2>

        <div className="relative mb-6">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
          <input
            type="text"
            placeholder="Rechercher une question..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm transition ${
                activeCategory === cat
                  ? "bg-[#022b53] text-yellow-100"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-5">
              <div
                className="flex justify-between items-center cursor-pointer gap-4"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="px-3 py-1 text-xs rounded-lg bg-gray-100">
                  {item.category}
                </span>
                <h3 className="text-lg font-medium flex-1">{item.question}</h3>
                {openIndex === idx ? (
                  <ChevronUpIcon className="w-6 h-6" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6" />
                )}
              </div>

              {openIndex === idx && (
                <p className="mt-4 text-gray-600">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* =========================
          FORMULAIRE CONTACT
      ========================= */}
      <div className="max-w-5xl mx-auto mt-16 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Contactez-nous
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Remplissez ce formulaire pour envoyer un message
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700">Nom</label>
              <InputField
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <InputField
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-medium text-gray-700">Sujet</label>
              <InputField
                name="subject"
                value={form.subject}
                onChange={handleChange}
                type="text"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            />
          </div>

          {status.message && (
            <div
              className={`mt-4 text-sm rounded-md px-4 py-2 ${
                status.type === "success"
                  ? "bg-green-100 text-green-700"
                  : status.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <button type="submit" className="flex items-center bg-[#022b53] p-3 rounded-lg hover:bg-gray-300 hover:text-[#022b53] text-white gap-2">
            <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
            Envoyer le message
          </button>
        </form>

        {/* Elfsight AI Chatbot | WECCO */}
        <div
          className="elfsight-app-c7dc3468-685e-4584-9632-5ad651802e75"
          data-elfsight-app-lazy
        />
      </div>
    </div>
  );
}
