import { useState, useEffect } from "react";

export default function Transfert() {
  const [activeTab, setActiveTab] = useState("interne"); // interne | externe
  return (
    <div className="p-6 mt-15 bg-gray-50 w-full md:p-2 mx-auto">
       <div className="mt-6">
        <h1 className="text-3xl font-semibold mb-1 ">Transfert d'argent</h1>
        <p className="mb-5 text-gray-600">Effectuez un transfert entre vos comptes ou vers un bénéficiaire
        </p>
      </div>
      {/* NAVTABS */}
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
   🔵 TRANSFERT INTERNE
--------------------------------------------------- */
function TransfertInterne() {
  const [montant, setMontant] = useState("");
  const [fromId, setFromId] = useState("");      // compte source
  const [toId, setToId] = useState("");          // compte destination
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [accounts, setAccounts] = useState([]);

  const quickValues = [50, 100, 200, 500];

  // Charger les comptes utilisateur
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/accounts", {
          headers: {
            Authorization:` Bearer ${token}`, // ✅ très important
          },
        });

        const data = await res.json();
        if (!res.ok) {
          console.log("Erreur récupération comptes :", data.message);
          return;
        }

        // 👇 adapte si ton back renvoie { accounts: [...] }
        const accs = Array.isArray(data) ? data : data.accounts || [];
        setAccounts(accs);

        // Par défaut : source = COURANT s'il existe
        const courant = accs.find(
          (a) => a.type?.toUpperCase() === "COURANT"
        );
        if (courant) setFromId(courant._id);
      } catch (err) {
        console.log("Erreur récupération comptes :", err);
      }
    };

    fetchAccounts();
  }, []);

  const handleTransfert = async () => {
    if (!montant || !fromId || !toId) {
      return alert("Veuillez choisir les deux comptes et le montant");
    }

    if (fromId === toId) {
      return alert("Le compte source et le compte destination doivent être différents");
    }

    const source = accounts.find((a) => a._id === fromId);
    const dest = accounts.find((a) => a._id === toId);

    if (!source || !dest) {
      return alert("Comptes introuvables");
    }

    setDisabled(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:5000/api/transactions/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅
          },
          body: JSON.stringify({
            fromId,
            toId,
            amount: Number(montant),
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
        setFromId(source._id); // on peut garder le même source
        setToId("");
      }, 2000);
    } catch (err) {
      alert("Erreur réseau");
      setDisabled(false);
    }
  };

  // Comptes destination = tous les comptes sauf le compte source sélectionné
  const destAccounts = accounts.filter((a) => a._id !== fromId);

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

      {/* Depuis le compte (source) */}
      <div>
        <label className="font-medium">Depuis le compte</label>
        <select
          className="w-full p-3 border rounded-xl mt-1 border-gray-300"
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
          disabled={disabled || accounts.length === 0}
        >
          <option value="">Sélectionner un compte</option>
          {accounts.map((acc) => (
            <option key={acc._id} value={acc._id}>
              {acc.type} — Solde : {acc.balance} XOF
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
          <option value="">Sélectionner un compte</option>
          {destAccounts.map((acc) => (
            <option key={acc._id} value={acc._id}>
              {acc.type} — Solde : {acc.balance} XOF
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
   🟣 TRANSFERT EXTERNE (AVEC CONTACTS RÉCENTS)
--------------------------------------------------- */
function TransfertExterne() {
  const [montant, setMontant] = useState("");
  const [beneficiaire, setBeneficiaire] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [currentAccount, setCurrentAccount] = useState(null);
  const [users, setUsers] = useState([]);

  const quickValues = [50, 100, 200, 500];

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        // 🔹 Compte courant
        const accRes = await fetch("http://localhost:5000/api/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const accData = await accRes.json();
        const accounts = accData.accounts || accData;

        const courant = accounts.find(
          (a) => a.type?.toUpperCase() === "COURANT"
        );
        setCurrentAccount(courant);

        // 🔹 Utilisateurs enregistrés
        const userRes = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUsers(userData.users || userData);
      } catch (err) {
        console.error("Erreur chargement transfert externe", err);
      }
    };

    fetchData();
  }, []);

  const handleTransfert = async () => {
    if (!montant || !selectedUser) {
      return alert("Veuillez choisir un bénéficiaire et un montant");
    }

    setDisabled(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/transactions/transfer-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            toUserId: selectedUser._id,
            amount: Number(montant),
            description: "Transfert externe",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur transfert");
        setDisabled(false);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setDisabled(false);
        setMontant("");
        setBeneficiaire("");
        setSelectedUser(null);
      }, 2000);
    } catch (err) {
      alert("Erreur réseau");
      setDisabled(false);
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row gap-6">

      {/* POPUP SUCCESS */}
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

        {/* COMPTE COURANT */}
        <div>
          <label className="font-medium">Depuis le compte</label>
          <div className="p-3 border border-gray-200 rounded-xl mt-1">
            {currentAccount ? (
              <>
                <p className="text-gray-500 text-sm">Compte courant</p>
                <p className="font-medium">
                  Solde : {currentAccount.balance} XOF
                </p>
              </>
            ) : (
              <p className="text-gray-400">Chargement...</p>
            )}
          </div>
        </div>

        {/* BÉNÉFICIAIRE */}
        <div>
          <label className="font-medium">Bénéficiaire</label>
          <input
            type="text"
            value={beneficiaire}
            onChange={(e) => {
              setBeneficiaire(e.target.value);
              setSelectedUser(null);
            }}
            placeholder="Nom ou numéro"
            disabled={disabled}
            className="w-full p-3 border border-gray-300 rounded-xl mt-1"
          />

          {/* LISTE UTILISATEURS */}
          {beneficiaire && (
            <div className="border rounded-xl mt-2 max-h-48 overflow-y-auto">
              {users
                .filter(
                  (u) =>
                    u.name?.toLowerCase().includes(beneficiaire.toLowerCase()) ||
                    u.phone?.includes(beneficiaire)
                )
                .map((u) => (
                  <button
                    key={u._id}
                    onClick={() => {
                      setSelectedUser(u);
                      setBeneficiaire(`${u.name} — ${u.phone}`);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <p className="font-medium">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.phone}</p>
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* MONTANT */}
        <div>
          <label className="font-medium">Montant</label>
          <div className="flex items-center mt-1">
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
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

      {/* CONTACTS RÉCENTS (inchangé visuellement) */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow mt-4 lg:mt-0">
        <h3 className="font-semibold mb-4">Contacts récents</h3>

        <div className="space-y-4">
          {users.slice(0, 5).map((u) => (
            <button
              key={u._id}
              onClick={() => {
                setSelectedUser(u);
                setBeneficiaire(`${u.name} — ${u.phone}`);
              }}
              disabled={disabled}
              className="flex items-center gap-3 w-full text-left"
            >
              <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-medium">
                {u.name?.[0]}
              </div>
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-gray-500">{u.phone}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
