import React, { useState } from "react";
import { FaDroplet } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { PiDeviceMobileCamera } from "react-icons/pi";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Select from "../components/Select";

export default function Paiement() {
  const [activeTab, setActiveTab] = useState("eau");

  const [formData, setFormData] = useState({
    service: "Eau",
    reference: "",
    amount: "",
  });

  const tabs = [
    { id: "eau", label: "Eau", icon: FaDroplet },
    { id: "electricite", label: "Électricité", icon: MdElectricBolt },
    { id: "internet", label: "Internet", icon: FaWifi },
    { id: "mobile", label: "Mobile", icon: PiDeviceMobileCamera },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!formData.reference || !formData.amount)
      return alert("Remplir tous les champs !");
    alert(`Paiement de ${formData.amount} XOF pour ${formData.service} réussi !`);
  };
  

  const montant = parseFloat(formData.amount) || 0;
  const frais = 0;
  const total = montant + frais;
  

  return (
    <div className="w-full mt-5 p-4 bg-gray-50">
      <div>
        <h1 className="font-semibold text-3xl mt-1">Paiement de factures</h1>
        <p className="mt-1 mb-7 text-gray-600">Payez vos factures et services en ligne</p>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tabs.map((t) => (
          <li
            key={t.id}
            onClick={() => {
              setActiveTab(t.id);
              setFormData({ service: t.label, reference: "", amount: "" });
            }}
            className={`cursor-pointer text-center shadow p-5 w-full rounded-xl   
              flex flex-col items-center gap-2
              transition duration-200
              ${activeTab === t.id ? "bg-blue-900 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
          >
            <t.icon className="w-8 h-8" />
            <span className="font-semibold">{t.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 p-5 rounded-xl">
        <div className="py-4">
          <h4 className="font-bold text-lg mb-4">Détails du paiement</h4>
          <div className="flex flex-col md:flex-row gap-6 p-4 w-full">

            <div className="md:w-2/3 w-full shadow p-4 bg-white rounded-lg">
              <form onSubmit={handlePayment} autoComplete="off">
                <h4>Payer depuis</h4>

                <div className="mt-4">
                  <Select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="Eau">Eau</option>
                    <option value="Électricité">Électricité</option>
                    <option value="Internet">Internet</option>
                    <option value="Mobile">Mobile</option>
                  </Select>
                </div>

                <div className="mt-4">
                  <label>Référence / Fournisseur</label>
                  <InputField
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    placeholder="ex: 123456789"
                    autoComplete="off"
                  />
                </div>

                <div className="mt-4">
                  <label>Montant</label>
                  <InputField
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="XOF"
                    autoComplete="off"
                  />
                </div>

                <Button type="submit" className="mt-4 w-full">Payer maintenant</Button>
              </form>
            </div>

            <div className="md:w-1/3 w-full bg-white shadow p-4 rounded-lg">
              <p className="font-semibold mb-4">Récapitulatif</p>
              <div className="flex justify-between mb-2">
                <span>Service</span>
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
                <span>Frais de service</span>
                <span className="text-green-500">Gratuit</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total} XOF</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
