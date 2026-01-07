import React, { useState, useRef } from "react";
import { FaDroplet } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { PiDeviceMobileCamera } from "react-icons/pi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Select from "../components/Select";
import ExportCSV from "../components/ExportCSV";


export default function Paiement() {
  const [activeTab, setActiveTab] = useState("eau");
  const [fromAccountId, setFromAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [serviceCode, setServiceCode] = useState("EAU");
  const [billNumber, setBillNumber] = useState("");

  const [formData, setFormData] = useState({
    service: "Eau",
    serviceCode: "EAU",
    billNumber: "",
    amount: "",
    description: "",
  });

  const [receiptData, setReceiptData] = useState({
    service: "-",
    billNumber: "-",
    amount: 0,
    total: 0,
    description: "-",
  });

  const receiptRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("success");
  const [loading, setLoading] = useState(false);

  const serviceMap = {
    Eau: "EAU",
    Électricité: "ELECTRICITE",
    Internet: "INTERNET",
    Mobile: "MOBILE",
  };

  const serviceToTab = {
    Eau: "eau",
    Électricité: "electricite",
    Internet: "internet",
    Mobile: "mobile",
  };

  const tabs = [
    { id: "eau", label: "Eau", icon: FaDroplet },
    { id: "electricite", label: "Électricité", icon: MdElectricBolt },
    { id: "internet", label: "Internet", icon: FaWifi },
    { id: "mobile", label: "Mobile", icon: PiDeviceMobileCamera },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "service") {
      setActiveTab(serviceToTab[value]);
      setFormData({
        ...formData,
        service: value,
        serviceCode: serviceMap[value],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔹 Paiement avec Bearer Token
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!formData.billNumber || !formData.amount) {
      setModalStatus("error");
      setModalMessage("Veuillez remplir tous les champs.");
      setShowModal(true);
      return;
    }

    const token = localStorage.getItem("token"); // côté navigateur seulement
    if (!token) {
      setModalStatus("error");
      setModalMessage("Vous devez être connecté pour effectuer un paiement.");
      setShowModal(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/transactions/bill-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            accountId: fromAccountId, // assure-toi que cette variable est bien définie
            amount: Number(formData.amount),
            serviceName: formData.service,
            serviceCode: formData.serviceCode, // 🔹 AJOUTER ICI
            billNumber: formData.billNumber.trim(),
            description: formData.description || "-",
          })


        }
      );

      // Si le serveur renvoie autre chose que JSON (erreur HTML), on le gère
      let data;
      try {
        data = await response.json();
      } catch {
        const text = await response.text();
        throw new Error(text || "Erreur inattendue du serveur");
      }

      if (!response.ok) {
        throw new Error(data?.message || "Erreur lors du paiement.");
      }

      setReceiptData({
        service: formData.service,
        billNumber: formData.billNumber,
        amount: Number(formData.amount),
        total: Number(formData.amount),
        description: formData.description || "-",
      });

      setModalStatus("success");
      setModalMessage("Paiement effectué avec succès.");
      setShowModal(true);

      // Réinitialiser le formulaire
      setFormData({
        service: formData.service,
        serviceCode: formData.serviceCode,
        billNumber: "",
        amount: "",
        description: "",
      });
    } catch (error) {
      setModalStatus("error");
      setModalMessage(error.message);
      setShowModal(true);
    }

    setLoading(false);
  };

  // 🔹 Télécharger reçu PDF
  const downloadPDF = async () => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("recu-paiement.pdf");
  };

  const receiptCSVData = [
    {
      Service: receiptData.service,
      Reference: receiptData.billNumber,
      Montant: receiptData.amount,
      Description: receiptData.description,
      Total: receiptData.total,
    },
  ];

  return (
    <div className="w-full mt-18 p-4 z-0 bg-yellow-100">
      <h1 className="font-semibold text-3xl mb-6">Paiement de factures</h1>
      <p className="mb-5 text-gray-600">
          Effectuez un paiement entre vos comptes ou vers un bénéficiaire
        </p>

      {/* ONGLET */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tabs.map((t) => (
          <li
            key={t.id}
            onClick={() => {
              setActiveTab(t.id);
              setFormData({
                service: t.label,
                serviceCode: serviceMap[t.label],
                billNumber: "",
                amount: "",
                description: "",
              });
            }}
            className={`cursor-pointer text-center shadow p-5 rounded-xl transition
              ${activeTab === t.id ? "bg-[#022b53] text-yellow-100" : "bg-white text-[#022b53] hover:bg-gray-100"}`}
          >
            <t.icon className="w-8 h-8 mx-auto mb-2" />
            <span className="font-semibold">{t.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        {/* FORMULAIRE */}
        <div className="md:w-2/3 bg-white shadow p-4 rounded-lg">
          <form onSubmit={handlePayment}>
            <Select name="service" value={formData.service} onChange={handleChange}>
              <option value="Eau">Eau</option>
              <option value="Électricité">Électricité</option>
              <option value="Internet">Internet</option>
              <option value="Mobile">Mobile</option>
            </Select>

            <InputField
              className="mt-4"
              name="billNumber"
              value={formData.billNumber}
              onChange={handleChange}
              placeholder="Référence / Numéro de facture"
            />

            <InputField
              className="mt-4"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Montant XOF"
            />

            <InputField
              className="mt-4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (facultatif)"
            />

            <Button type="submit" className="mt-4 w-full hover:text-[#022b53]" disabled={loading}>
              {loading ? "Paiement..." : "Payer maintenant"}
            </Button>
          </form>
        </div>

        {/* 🧾 REÇU */}
        <div ref={receiptRef} className="md:w-1/3 w-full bg-white shadow p-4 rounded-lg">
          <p className="font-semibold mb-4">Récapitulatif</p>
          <div className="flex justify-between mb-2">
            <span>Service</span>
            <span>{receiptData.service}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Référence / Facture</span>
            <span>{receiptData.billNumber}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Montant</span>
            <span>{receiptData.amount} XOF</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Description</span>
            <span>{receiptData.description}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{receiptData.total} XOF</span>
          </div>

          {receiptData.amount > 0 && (
            <div className="flex flex-col gap-2 mt-4">
              <Button onClick={downloadPDF} className="w-full">
                Télécharger le reçu PDF
              </Button>

              <Button className="w-full">
                <ExportCSV data={receiptCSVData} fileName="recu-paiement.csv">
                  Télécharger le reçu CSV
                </ExportCSV>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center">
            <h2
              className={`text-xl font-semibold mb-3 ${
                modalStatus === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modalStatus === "success" ? "Paiement réussi" : "Erreur"}
            </h2>
            <p>{modalMessage}</p>
            <Button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-blue-900 text-white px-4 py-2 rounded-lg w-full"
            >
              Fermer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
;