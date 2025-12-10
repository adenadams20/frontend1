import { useState } from "react";

export default function Transfert() {
  const [activeTab, setActiveTab] = useState("interne");

  return (
    <div className="p-6 mt-15 bg-gray-50 w-full md:p-2 mx-auto">
      <div className="mt-6">
        <h1 className="text-3xl font-semibold mb-1">Transfert d'argent</h1>
        <p className="mb-5 text-gray-600">
          Effectuez un transfert entre vos comptes ou vers un bénéficiaire
        </p>
      </div>

      {/* NAV TABS */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-100 gap-2 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("interne")}
            className={`px-6 py-5 rounded-xl ${
              activeTab === "interne"
                ? "bg-blue-900 shadow font-medium text-white"
                : "text-blue-600"
            }`}
          >
            Transfert interne
          </button>

          <button
            onClick={() => setActiveTab("externe")}
            className={`px-6 py-5 rounded-xl ${
              activeTab === "externe"
                ? "bg-blue-900 shadow font-medium text-white"
                : "text-blue-600"
            }`}
          >
            Transfert externe
          </button>
        </div>
      </div>

      {activeTab === "interne" ? <TransfertInterne /> : <TransfertExterne />}
    </div>
  );
}

/* ---------------------------------------------------
   🔵 TRANSFERT INTERNE — fetch corrigé
--------------------------------------------------- */
function TransfertInterne() {
  const [montant, setMontant] = useState("");
  const [compte, setCompte] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const quickValues = [50, 100, 200, 500];

  const handleTransfert = async () => {
    if (!montant || !compte)
      return alert("Veuillez remplir tous les champs");

    setDisabled(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/transactions/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: Number(montant),
            toAccount: compte,
            type: "interne",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur serveur");
        setDisabled(false);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setDisabled(false);
        setMontant("");
        setCompte("");
      }, 2000);
    } catch (err) {
      alert("Erreur réseau");
      setDisabled(false);
    }
  };

  return (
    <div className="relative space-y-6 bg-white p-6 rounded-2xl shadow">
      {success && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-2xl z-10">
          <div className="text-blue-600 text-5xl">✔</div>
          <p className="text-blue-600 text-lg font-semibold mt-2">
            Transfert interne réussi !
          </p>
        </div>
      )}

      <div>
        <label className="font-medium">Vers le compte</label>
        <select
          className="w-full p-3 border rounded-xl mt-1 border-gray-300"
          value={compte}
          onChange={(e) => setCompte(e.target.value)}
        >
          <option value="">Sélectionner un compte</option>
          <option>Courant</option>
          <option>Épargne</option>
          <option>Business</option>
        </select>
      </div>

      <div>
        <label className="font-medium">Montant</label>
        <div className="flex items-center mt-1">
          <input
            type="number"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            placeholder="0.00"
            disabled={disabled}
            className="w-full p-3 border border-gray-300 rounded-l-xl"
          />
          <div className="p-3 border border-gray-300 rounded-r-xl bg-gray-100">
            XOF
          </div>
        </div>

        <div className="flex gap-2 mt-2 flex-wrap">
          {quickValues.map((v) => (
            <button
              key={v}
              disabled={disabled}
              onClick={() => setMontant(v)}
              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-xl text-sm"
            >
              {v} XOF
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleTransfert}
          disabled={disabled}
          className="w-xl bg-blue-900 text-white p-3 rounded-xl font-medium hover:bg-blue-600"
        >
          Effectuer le transfert
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   🟣 TRANSFERT EXTERNE — fetch corrigé
--------------------------------------------------- */
function TransfertExterne() {
  const [montant, setMontant] = useState("");
  const [beneficiaire, setBeneficiaire] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const quickValues = [50, 100, 200, 500];

  const [contacts, setContacts] = useState([
    { initials: "MD", name: "Marie Dubois", email: "marie@email.com" },
    { initials: "PM", name: "Pierre Martin", email: "pierre@email.com" },
  ]);

  const handleTransfert = async () => {
    if (!montant || !beneficiaire)
      return alert("Veuillez remplir tous les champs");

    setDisabled(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/transactions/transfer/beneficiary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: Number(montant),
            beneficiary: beneficiaire,
            type: "externe",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur serveur");
        setDisabled(false);
        return;
      }

      setSuccess(true);

      const newContact = {
        initials: beneficiaire
          .split(" ")
          .map((c) => c[0])
          .join("")
          .toUpperCase(),
        name: beneficiaire,
        email: "inconnu@email.com",
      };

      setContacts([newContact, ...contacts]);

      setTimeout(() => {
        setSuccess(false);
        setDisabled(false);
        setMontant("");
        setBeneficiaire("");
      }, 2000);
    } catch (err) {
      alert("Erreur réseau");
      setDisabled(false);
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row gap-6">
      {success && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-2xl z-10">
          <div className="text-blue-600 text-5xl">✔</div>
          <p className="text-blue-600 text-lg font-semibold mt-2">
            Transfert externe réussi !
          </p>
        </div>
      )}

      {/* FORMULAIRE */}
      <div className="w-full lg:w-2/3 space-y-4 bg-white p-6 rounded-2xl shadow">
        <div>
          <label className="font-medium">Depuis le compte</label>
          <div className="p-3 border border-gray-200 rounded-xl mt-1">
            <p className="text-gray-500 text-sm">Compte courant</p>
          </div>
        </div>

        <div>
          <label className="font-medium">Bénéficiaire</label>
          <input
            type="text"
            value={beneficiaire}
            onChange={(e) => setBeneficiaire(e.target.value)}
            placeholder="Ex: Pierre Ndiaye"
            disabled={disabled}
            className="w-full p-3 border border-gray-300 rounded-xl mt-1"
          />
        </div>

        <div>
          <label className="font-medium">Montant</label>
          <div className="flex items-center mt-1">
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              placeholder="0.00"
              disabled={disabled}
              className="w-full p-3 border border-gray-300 rounded-l-xl"
            />
            <div className="p-3 border border-gray-300 rounded-r-xl bg-gray-100">
              XOF
            </div>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {quickValues.map((v) => (
              <button
                key={v}
                disabled={disabled}
                onClick={() => setMontant(v)}
                className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-xl text-sm"
              >
                {v} XOF
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleTransfert}
          disabled={disabled}
          className="w-full bg-blue-900 text-white p-3 rounded-xl font-medium hover:bg-blue-600"
        >
          Effectuer le transfert
        </button>
      </div>

      {/* CONTACTS RÉCENTS */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow mt-4 lg:mt-0">
        <h3 className="font-semibold mb-4">Contacts récents</h3>

        <div className="space-y-4">
          {contacts.map((c, i) => (
            <button
              key={i}
              onClick={() => setBeneficiaire(c.name)}
              disabled={disabled}
              className="flex items-center gap-3 w-full text-left"
            >
              <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-medium">
                {c.initials}
              </div>
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
