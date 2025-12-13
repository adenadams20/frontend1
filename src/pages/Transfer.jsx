import { useState, useEffect } from "react";

export default function Transfert() {
  const [activeTab, setActiveTab] = useState("interne"); // interne | externe
  return (
    <div className="w-full mx-auto bg-gray-50 px-4 sm:px-6 md:px-2 py-6 mt-15">
      <div className="mt-6">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-1">
          Transfert d'argent
        </h1>
        <p className="mb-5 text-gray-600 text-sm sm:text-base">
          Effectuez un transfert entre vos comptes ou vers un bénéficiaire
        </p>
      </div>

      {/* NAVTABS */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col sm:flex-row w-full sm:w-auto bg-gray-100 gap-2 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("interne")}
            className={`w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-5 rounded-xl ${
              activeTab === "interne"
                ? "bg-blue-900 shadow font-medium text-white"
                : "text-blue-600"
            }`}
          >
            Transfert interne
          </button>

          <button
            onClick={() => setActiveTab("externe")}
            className={`w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-5 rounded-xl ${
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
   🔵 TRANSFERT INTERNE
--------------------------------------------------- */
function TransfertInterne() {
  const [montant, setMontant] = useState("");
  const [fromId, setFromId] = useState(""); // compte source
  const [toId, setToId] = useState(""); // compte destination
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [accounts, setAccounts] = useState([]);

  // ✅ Message inline (remplace alert)
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // error | warning | success | info

  const quickValues = [50, 100, 200, 500];

  // Charger les comptes utilisateur
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setMessage("");
        setMessageType("");

        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/accounts", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ très important
          },
        });

        const data = await res.json();
        if (!res.ok) {
          console.log("Erreur récupération comptes :", data.message);
          setMessage(data.message || "Erreur récupération comptes");
          setMessageType("error");
          return;
        }

        // 👇 adapte si ton back renvoie { accounts: [...] }
        const accs = Array.isArray(data) ? data : data.accounts || [];
        setAccounts(accs);

        // ✅ on ne pré-sélectionne rien pour afficher "Sélectionner un compte"
        setFromId("");
        setToId("");
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
    setMessage("");
    setMessageType("");

    const amt = Number(montant);

    if (!fromId || !toId || Number.isNaN(amt) || amt <= 0) {
      setMessage("Veuillez saisir un montant valide et choisir les deux comptes");
      setMessageType("warning");
      return;
    }

    if (fromId === toId) {
      setMessage(
        "Le compte source et le compte destination doivent être différents"
      );
      setMessageType("warning");
      return;
    }

    const source = accounts.find((a) => a._id === fromId);
    const dest = accounts.find((a) => a._id === toId);

    if (!source || !dest) {
      setMessage("Comptes introuvables");
      setMessageType("error");
      return;
    }

    // ✅ Optionnel UX : checks rapides (le BACK fera la vraie vérif)
    if (String(source.status || "").toUpperCase() !== "ACTIVE") {
      setMessage("Le compte source n'est pas actif");
      setMessageType("error");
      return;
    }
    if (String(dest.status || "").toUpperCase() !== "ACTIVE") {
      setMessage("Le compte destination n'est pas actif");
      setMessageType("error");
      return;
    }
    if (source.balance < amt) {
      setMessage("Solde insuffisant sur le compte source");
      setMessageType("warning");
      return;
    }

    setDisabled(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/transactions/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fromId, toId, amount: amt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Erreur serveur");
        setMessageType(res.status === 400 ? "warning" : "error");
        setDisabled(false);
        return;
      }

      setSuccess(true);
      setMessage("Transfert interne réussi !");
      setMessageType("success");

      setTimeout(() => {
        setSuccess(false);
        setDisabled(false);
        setMontant("");
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

  // Comptes destination = tous les comptes sauf le compte source sélectionné
  const destAccounts = accounts.filter((a) => a._id !== fromId);

  return (
    <div className="relative space-y-6 bg-white p-4 sm:p-6 rounded-2xl shadow">
      {success && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-2xl z-10">
          <div className="text-blue-600 text-5xl">✔</div>
          <p className="text-blue-600 text-lg font-semibold mt-2">
            Transfert interne réussi !
          </p>
        </div>
      )}

      {/* ✅ Affichage inline (sans changer ton style global) */}
      {message ? (
        <div
          className={`p-3 border rounded-xl ${
            messageType === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : messageType === "warning"
              ? "bg-yellow-50 border-yellow-200 text-yellow-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <p className="text-sm font-medium">{message}</p>
        </div>
      ) : null}

      {/* Depuis le compte (source) */}
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

      {/* Vers le compte (destination) */}
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
          className="w-full sm:w-xl bg-blue-900 text-white p-3 rounded-xl font-medium hover:bg-blue-600"
        >
          Effectuer le transfert
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   🟣 TRANSFERT EXTERNE (AVEC CONTACTS RÉCENTS)
--------------------------------------------------- */
function TransfertExterne() {
  const [montant, setMontant] = useState("");
  const [beneficiaire, setBeneficiaire] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [fromAccountId, setFromAccountId] = useState("");
  const [beneficiaryId, setBeneficiaryId] = useState("");

  const [contacts, setContacts] = useState([]);

  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const quickValues = [50, 100, 200, 500];

  /* ----------------------------------
     1️⃣ Charger le compte courant
  ---------------------------------- */
  useEffect(() => {
    const fetchCourant = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const accs = Array.isArray(data) ? data : data.accounts || [];
        const courant = accs.find(
          (a) => a.type?.toUpperCase() === "COURANT"
        );

        if (courant) setFromAccountId(courant._id);
      } catch {}
    };
    fetchCourant();
  }, []);

  /* ----------------------------------
     2️⃣ Charger les bénéficiaires
  ---------------------------------- */
  const fetchBeneficiaries = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/beneficiaries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      const list = data?.beneficiary || [];

      const formatted = list.map((b) => ({
        _id: b._id,
        name: b.name,
        initials: b.name
          .split(" ")
          .map((c) => c[0])
          .join("")
          .toUpperCase(),
        accountNumber: b.accountNumber,
      }));

      setContacts(formatted);
    } catch {}
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  /* ----------------------------------
     3️⃣ Transfert externe (LOGIQUE CLÉ)
  ---------------------------------- */
  const handleTransfert = async () => {
    setMessage("");
    setMessageType("");

    const amt = Number(montant);

    if (!fromAccountId) {
      setMessage("Compte courant introuvable");
      setMessageType("error");
      return;
    }

    if (!beneficiaire || !accountNumber) {
      setMessage(
        "Veuillez renseigner le bénéficiaire et son numéro de compte"
      );
      setMessageType("warning");
      return;
    }

    if (Number.isNaN(amt) || amt <= 0) {
      setMessage("Montant invalide");
      setMessageType("warning");
      return;
    }

    setDisabled(true);

    try {
      const token = localStorage.getItem("token");
      let finalBeneficiaryId = beneficiaryId;

      /* 🔵 A — créer bénéficiaire si non existant */
      if (!finalBeneficiaryId) {
        const resCreate = await fetch(
          "http://localhost:5000/api/beneficiaries",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: beneficiaire,
              accountNumber,
              type: "EXTERNAL",
            }),
          }
        );

        const dataCreate = await resCreate.json();

        if (!resCreate.ok) {
          setMessage(dataCreate?.message || "Erreur création bénéficiaire");
          setMessageType("error");
          setDisabled(false);
          return;
        }

        finalBeneficiaryId = dataCreate.beneficiary._id;
        setBeneficiaryId(finalBeneficiaryId);

        await fetchBeneficiaries(); // refresh contacts
      }

      /* 🔵 B — effectuer le transfert */
      const resTransfer = await fetch(
        "http://localhost:5000/api/transactions/transfer/beneficiaries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fromAccountId,
            beneficiaryId: finalBeneficiaryId,
            amount: amt,
            currency: "XOF",
            idempotencyKey: `${Date.now()}-${Math.random()}`,
          }),
        }
      );

      const dataTransfer = await resTransfer.json();

      if (!resTransfer.ok) {
        setMessage(dataTransfer?.message || "Erreur transfert");
        setMessageType("error");
        setDisabled(false);
        return;
      }

      setSuccess(true);
      setMessage("Transfert externe effectué avec succès");
      setMessageType("success");

      setTimeout(() => {
        setSuccess(false);
        setDisabled(false);
        setMontant("");
        setBeneficiaire("");
        setAccountNumber("");
        setBeneficiaryId("");
        setMessage("");
        setMessageType("");
      }, 2000);
    } catch {
      setMessage("Erreur réseau");
      setMessageType("error");
      setDisabled(false);
    }
  };

  /* ----------------------------------
     4️⃣ JSX
  ---------------------------------- */
  return (
    <div className="relative flex flex-col lg:flex-row gap-6">
      {/* FORMULAIRE */}
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
          <div className="p-3 border rounded-xl text-sm text-gray-500">
            Compte courant
          </div>
        </div>

        <div>
          <label className="font-medium">Bénéficiaire</label>
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
          <label className="font-medium">Numéro de compte / Téléphone</label>
          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
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
        </div>

        <button
          onClick={handleTransfert}
          disabled={disabled}
          className="w-full bg-blue-900 text-white p-3 rounded-xl"
        >
          Effectuer le transfert
        </button>
      </div>

      {/* CONTACTS */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-4">Contacts récents</h3>
        <div className="space-y-3">
          {contacts.map((c) => (
            <button
              key={c._id}
              onClick={() => {
                setBeneficiaire(c.name);
                setAccountNumber(c.accountNumber);
                setBeneficiaryId(c._id);
              }}
              className="flex items-center gap-3 w-full text-left"
            >
              <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center">
                {c.initials}
              </div>
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">
                  {c.accountNumber}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// export default TransfertExterne;
