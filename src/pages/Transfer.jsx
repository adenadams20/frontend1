import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";



export default function Transfert({ onNewTransaction }) {
  const [activeTab, setActiveTab] = useState("interne"); // interne | externe
  return (
    <div className="p-6 mt-20  w-full md:p-2 mx-auto">
      <div className="mt-6">
        <h1 className="text-3xl font-semibold mb-1 text-center">Transfert d'argent</h1>
        <p className="mb-5 text-gray-600 text-center">
          Effectuez un transfert entre vos comptes ou vers un bénéficiaire
        </p>
      </div>


      {/* NAVTABS */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-transparent gap-2 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("interne")}
            className={`w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-5 rounded-xl ${
              activeTab === "interne"
                ? "bg-[#022b53]  shadow font-medium text-white"
                : "text-[#022b53] font-bold"
            }`}
          >
            Transfert interne
          </button>

          <button
            onClick={() => setActiveTab("externe")}
            className={`w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-5 rounded-xl ${
              activeTab === "externe"
                ? "bg-[#022b53] font-medium text-white"
                : "text-[#022b53] font-bold"
            }`}
          >
            Transfert externe
          </button>
        </div>
      </div>

      {activeTab === "interne" ? (
        <TransfertInterne onNewTransaction={onNewTransaction} />
      ) : (
        <TransfertExterne onNewTransaction={onNewTransaction} />
      )}
    </div>
  );
}

/* ---------------------------------------------------
   🔵 TRANSFERT INTERNE
--------------------------------------------------- */
function TransfertInterne({ onNewTransaction }) {
  const [montant, setMontant] = useState("");
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [accounts, setAccounts] = useState([]);

  // ✅ AJOUT OBLIGATOIRE
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const quickValues = [5000, 10000, 20000, 50000];


  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setMessage("");
        setMessageType("");

        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/accounts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) return console.log("Erreur récupération comptes :", data.message);

        const accs = Array.isArray(data) ? data : data.accounts || [];
        setAccounts(accs);

        const courant = accs.find((a) => a.type?.toUpperCase() === "COURANT");
        if (courant) setFromId(courant._id);
      } catch (err) {
        console.log("Erreur récupération comptes :", err);
        setMessage("Erreur réseau lors de la récupération des comptes");
        setMessageType("error");
      }
    };
    fetchAccounts();
  }, []);

  // fonction handleTransfere
  const handleTransfert = async () => {
    if (!montant || !fromId || !toId)
      return alert("Veuillez choisir les deux comptes et le montant");
    if (fromId === toId) return alert("Le compte source et le compte destination doivent être différents");

    const source = accounts.find((a) => a._id === fromId);
    const dest = accounts.find((a) => a._id === toId);
    if (!source || !dest) return alert("Comptes introuvables");

    setDisabled(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/transactions/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fromId, toId, amount: Number(montant) }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Erreur serveur");
        setMessageType(res.status === 400 ? "warning" : "error");
        setDisabled(false);
        return;
      }

      // ✅ Ajouter la transaction créée à Transactions
      if (onNewTransaction && data.transaction) {
        onNewTransaction(data.transaction);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setDisabled(false);
        setMontant("");
        setFromId(source._id);
        setToId("");
        setMessage("");
        setMessageType("");
      }, 2000);
    } catch (err) {
      setMessage("Erreur réseau");
      setMessageType("error");
      setDisabled(false);
    }
  };

  const destAccounts = accounts.filter((a) => a._id !== fromId);

  // Comptes destination = tous les comptes sauf le compte source sélectionné
  // const destAccounts = accounts.filter((a) => a._id !== fromId);

  return (
    <div className="relative space-y-6 bg-white p-4 rounded-2xl shadow">
      {success && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-2xl z-10">
          <div className="text-blue-600 text-5xl">✔</div>
          <p className="text-blue-600 text-lg font-semibold mt-2">Transfert interne réussi !</p>
        </div>
      )}

      {/* Depuis le compte */}
      <div>
        <label className="font-medium">Depuis le compte</label>
        <select
          className="w-full p-3 border rounded-xl mt-1 border-gray-300"
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
          disabled={disabled || accounts.length === 0}
        >
          {!fromId && (
            <option value="" disabled>
              Sélectionner un compte
            </option>
          )}

          {accounts.map((acc) => (
            <option key={acc._id} value={acc._id}>
              {acc.type}
            </option>
          ))}
        </select>
      </div>

      {/* Vers le compte */}
      <div>
        <label className="font-medium">Vers le compte</label>
        <select
          className="w-full p-3 border rounded-xl mt-1 border-gray-300"
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          disabled={disabled || destAccounts.length === 0}
        >
          {!toId && (
            <option value="" disabled>
              Sélectionner un compte
            </option>
          )}

          {destAccounts.map((acc) => (
            <option key={acc._id} value={acc._id}>
              {acc.type}
            </option>
          ))}
        </select>
      </div>

      {/* Montant */}
      {/* Montant */}
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
          <div className="p-3 border border-gray-300 rounded-r-xl bg-gray-100">XOF</div>
        </div>

        <div className="flex gap-2 mt-2 flex-wrap">
          {quickValues.map((v) => (
            <button
              key={v}
              disabled={disabled}
              type="button"
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
          className="w-xl bg-[#022b53] text-white hover:bg-gray-300 hover:text-[#022b53] p-3 rounded-xl disabled:opacity-60"
        >
          Effectuer le transfert
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   🟣 TRANSFERT EXTERNE
--------------------------------------------------- */
function TransfertExterne({ onNewTransaction }) {
  const [montant, setMontant] = useState("");
  const [beneficiaire, setBeneficiaire] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [fromAccountId, setFromAccountId] = useState("");
  const [beneficiaryId, setBeneficiaryId] = useState("");
  const [contacts, setContacts] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchCourant = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/accounts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const accs = Array.isArray(data) ? data : data.accounts || [];
        const courant = accs.find((a) => a.type?.toUpperCase() === "COURANT");
        if (courant) setFromAccountId(courant._id);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCourant();
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      setMessage("");
      setMessageType("");
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/beneficiaries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erreur chargement bénéficiaires");
      const list = data?.beneficiary || [];
      setContacts(
        list.map((b) => ({
          _id: b._id,
          name: b.name,
          initials: (b.name || "")
            .split(" ")
            .filter(Boolean)
            .map((c) => c[0])
            .join("")
            .toUpperCase(),
          accountNumber: b.accountNumber,
        }))
      );
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors du rafraîchissement des contacts");
      setMessageType("error");
    }
  };

  const handleTransfert = async () => {
    setMessage("");
    setMessageType("");

    const amt = Number(montant);
    if (!fromAccountId) return setMessage("Compte courant introuvable"), setMessageType("error");
    if (!accountNumber.trim()) return setMessage("Veuillez saisir le numéro du bénéficiaire"), setMessageType("warning");
    if (Number.isNaN(amt) || amt <= 0) return setMessage("Montant invalide"), setMessageType("warning");

    setDisabled(true);

    try {
      const token = localStorage.getItem("token");
      let finalBeneficiaryId = beneficiaryId;

      // Créer bénéficiaire si nécessaire
      if (!finalBeneficiaryId) {
        const resCreate = await fetch(`${API_URL}/api/beneficiary`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: (beneficiaire || "Bénéficiaire").trim(), accountNumber: accountNumber.trim() }),
        });
        const dataCreate = await resCreate.json();
        if (!resCreate.ok) return setMessage(dataCreate?.message || "Impossible d'ajouter ce bénéficiaire"), setMessageType("error"), setDisabled(false);

        finalBeneficiaryId = dataCreate?.beneficiary?._id;
        setBeneficiaryId(finalBeneficiaryId);
        await fetchBeneficiaries();
      }

      // Transfert
      const resTransfer = await fetch(`${API_URL}/api/transactions/transfer/beneficiary`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          fromAccountId,
          beneficiaryId: finalBeneficiaryId,
          amount: amt,
          currency: "XOF",
          idempotencyKey: `${Date.now()}-${Math.random()}`,
        }),
      });

      const dataTransfer = await resTransfer.json();
      if (!resTransfer.ok) return setMessage(dataTransfer?.message || "Erreur transfert"), setMessageType("error"), setDisabled(false);

      // ✅ Ajouter transaction à Transactions
      if (onNewTransaction && dataTransfer.transaction) onNewTransaction(dataTransfer.transaction);

      setMessage(dataTransfer?.message || "Transfert effectué avec succès");
      setMessageType("success");

      setTimeout(() => {
        setDisabled(false);
        setMontant("");
      }, 1200);
    } catch (e) {
      console.error(e);
      setMessage("Erreur réseau");
      setMessageType("error");
      setDisabled(false);
    }
    }
 
  return (
    <div className="relative flex flex-col lg:flex-row gap-6">
      {/* Formulaire */}
      <div className="w-full lg:w-2/3 bg-white p-6 rounded-2xl shadow space-y-4">
        {message && (
          <div
            className={`p-3 rounded-xl border ${
              messageType === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : messageType === "warning"
                ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <div>
          <label className="font-medium">Depuis le compte</label>
          <div className="p-3 border rounded-xl text-sm text-gray-500">Compte courant</div>
        </div>

        <div>
          <label className="font-medium">Nom bénéficiaire</label>
          <label className="font-medium">Nom bénéficiaire</label>
          <input
            value={beneficiaire}
            onChange={(e) => {
              setBeneficiaire(e.target.value);
              setBeneficiaryId("");
            }}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <div>
          <label className="font-medium">Téléphone du bénéficiaire</label>
          <input
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              setBeneficiaryId("");
            }}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <div>
          <label className="font-medium">Montant</label>
          <input
            type="number"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="number"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <button
          onClick={handleTransfert}
          disabled={disabled}
          className="w-full bg-[#022b53] text-white hover:bg-gray-300 hover:text-[#022b53] p-3 rounded-xl disabled:opacity-60"
        >
          Effectuer le transfert
        </button>
      </div>

      {/* Contacts */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Contacts (bénéficiaires)</h3>
          <button type="button" onClick={fetchBeneficiaries} className="text-sm px-3 py-1 border rounded-lg">
            Rafraîchir
          </button>
        </div>

        <div className="space-y-3">
          {contacts.length === 0 ? (
            <p className="text-sm text-gray-500">
              Aucun contact pour l’instant. Fais un transfert vers un utilisateur existant, et il sera stocké ici.
            </p>
          ) : (
            contacts.map((c) => (
              <button
                key={c._id}
                onClick={() => {
                  setBeneficiaire(c.name);
                  setAccountNumber(c.accountNumber);
                  setBeneficiaryId(c._id);
                }}
                className="flex items-center gap-3 w-full text-left"
              >
                <div className="w-10 h-10 bg-[#022b53] text-white rounded-full flex items-center justify-center">{c.initials}</div>
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.accountNumber}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
