import React, { useState, useEffect } from "react";
import { FaDroplet } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { PiDeviceMobileCamera } from "react-icons/pi";

import Button from "../components/Button";
import InputField from "../components/InputField";
import Select from "../components/Select";

export default function Paiement() {
  const [activeTab, setActiveTab] = useState("eau");

  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [selectedAccountId, setSelectedAccountId] = useState("");

  const [formData, setFormData] = useState({
    service: "Eau",
    reference: "",
    amount: "",
  });

  const [receipt, setReceipt] = useState(null); // Réçu modal

  // Services disponibles
  const services = [
    { id: "eau", label: "Eau", icon: FaDroplet },
    { id: "electricite", label: "Électricité", icon: MdElectricBolt },
    { id: "internet", label: "Internet", icon: FaWifi },
    { id: "mobile", label: "Mobile", icon: PiDeviceMobileCamera },
  ];

  // ================================
  // 🔵 Charger les comptes
  // ================================
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setAccounts(data);

          // Sélectionner automatiquement le compte courant
          const courant = data.find((a) => a.type?.toUpperCase() === "COURANT");
          if (courant) setSelectedAccountId(courant._id);
        }
      } catch (err) {
        console.log("Erreur chargement comptes :", err);
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  // ================================
  // 🔵 Mise à jour des champs
  // ================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================================
  // 🔵 Effectuer le paiement
  // ================================
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Conversion montant
      const amountNum = Number(formData.amount);
      if (!selectedAccountId || !amountNum || !formData.reference) {
        return alert("Veuillez remplir tous les champs correctement.");
      }

      // Définir le serviceCode pour le backend
      const serviceMap = {
        Eau: "EAU",
        Électricité: "ELECTRICITE",
        Mobile: "MOBILE",
        Internet: "INTERNET",
      };
      const serviceCode = serviceMap[formData.service];

      const res = await fetch("http://localhost:5000/api/transactions/bill-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          accountId: selectedAccountId,
          serviceCode,
          serviceName: formData.service,
          billNumber: formData.reference,
          amount: amountNum,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Erreur paiement");
      }

      // ✅ Mettre à jour le solde local
      setAccounts((prev) =>
        prev.map((a) =>
          a._id === selectedAccountId
            ? { ...a, balance: data.balanceAfter }
            : a
        )
      );

      // ✅ Créer le reçu
      setReceipt({
        service: formData.service,
        reference: formData.reference,
        amount: amountNum,
        date: new Date().toLocaleString(),
        balanceAfter: data.balanceAfter,
      });

      // Reset formulaire
      setFormData({ service: formData.service, reference: "", amount: "" });

    } catch (err) {
      console.error("Erreur paiement :", err);
      alert("Erreur lors du paiement");
    }
  };

  // ================================
  // 🔵 Calcul du total
  // ================================
  const montant = parseFloat(formData.amount) || 0;
  const frais = 0;
  const total = montant + frais;

  // ================================
  // 💄 UI
  // ================================
  return (
    <div className="w-full mt-5 p-4 bg-gray-50">
      <h1 className="font-semibold text-3xl mt-1">Paiement de factures</h1>
      <p className="mt-1 mb-7 text-gray-600">
        Payez vos factures et services en ligne
      </p>

      {/* Tabs Services */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((s) => (
          <li
            key={s.id}
            onClick={() => {
              setActiveTab(s.id);
              setFormData({
                service: s.label,
                reference: "",
                amount: "",
              });
            }}
            className={`cursor-pointer text-center shadow p-5 rounded-xl 
              flex flex-col items-center gap-2 
              transition duration-200
              ${
                activeTab === s.id
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            <s.icon className="w-8 h-8" />
            <span className="font-semibold">{s.label}</span>
          </li>
        ))}
      </ul>

      {/* Formulaire */}
      <div className="mt-6 p-5 rounded-xl">
        <div className="flex flex-col md:flex-row gap-6">

          {/* FORM */}
          <div className="md:w-2/3 w-full bg-white shadow p-4 rounded-lg">
            <form onSubmit={handlePayment}>
              {/* COMPTE SOURCE */}
              <label>Débiter depuis</label>
              <Select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
              >
                {loadingAccounts ? (
                  <option>Chargement...</option>
                ) : accounts.length === 0 ? (
                  <option>Aucun compte disponible</option>
                ) : (
                  accounts.map((acc) => (
                    <option key={acc._id} value={acc._id}>
                      {acc.type.toUpperCase()} — {acc.balance} XOF
                    </option>
                  ))
                )}
              </Select>

              {/* SERVICE DESTINATION */}
              <div className="mt-4">
                <label>Payer vers</label>
                <Select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.label}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </div>

              {/* RÉFÉRENCE */}
              <div className="mt-4">
                <label>Référence du fournisseur</label>
                <InputField
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  placeholder="ex: N° client, ID, téléphone..."
                />
              </div>

              {/* MONTANT */}
              <div className="mt-4">
                <label>Montant</label>
                <InputField
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="XOF"
                />
              </div>

              <Button className="mt-5 w-full">Payer maintenant</Button>
            </form>
          </div>

          {/* RÉCAP */}
          <div className="md:w-1/3 w-full bg-white shadow p-4 rounded-lg">
            <p className="font-semibold mb-4">Récapitulatif</p>

            <div className="flex justify-between mb-2">
              <span>Depuis</span>
              <span>
                {accounts.find((a) => a._id === selectedAccountId)?.type || "-"}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Vers</span>
              <span>{formData.service}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Référence</span>
              <span>{formData.reference || "-"}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Montant</span>
              <span>{montant} XOF</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Frais</span>
              <span className="text-green-600">Gratuit</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{total} XOF</span>
            </div>
          </div>

        </div>
      </div>

      {/* REÇU DE PAIEMENT */}
      {receipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-bold text-center mb-4">Reçu de paiement</h2>

            <p className="flex justify-between">
              <span>Service :</span> <b>{receipt.service}</b>
            </p>

            <p className="flex justify-between">
              <span>Référence :</span> <b>{receipt.reference}</b>
            </p>

            <p className="flex justify-between">
              <span>Montant :</span> <b>{receipt.amount} XOF</b>
            </p>

            <p className="flex justify-between">
              <span>Date :</span> <b>{receipt.date}</b>
            </p>

            <p className="flex justify-between">
              <span>Solde restant :</span> <b>{receipt.balanceAfter} XOF</b>
            </p>

            <button
              onClick={() => setReceipt(null)}
              className="mt-4 w-full bg-blue-900 text-white p-2 rounded-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
