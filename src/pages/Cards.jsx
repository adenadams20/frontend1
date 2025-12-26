import { useEffect, useMemo, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Cards() {
  const [showNumber, setShowNumber] = useState(false);

  const [card, setCard] = useState(null);

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loadingCard, setLoadingCard] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // ✅ flip recto/verso
  const [flipped, setFlipped] = useState(false);

  // ✅ edition limites
  const [editLimits, setEditLimits] = useState(false);
  const [limitsForm, setLimitsForm] = useState({ daily: "", monthly: "" });

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  const showStatus = (type, message, autoHide = true) => {
    setStatus({ type, message });
    if (autoHide) setTimeout(() => setStatus({ type: "", message: "" }), 2500);
  };

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }, [token]);
  const getFakeFullNumber = (last4) => {
    // numéro fictif, uniquement UX
    return `4123 5678 9012 ${last4}`;
  };

  const fetchCard = async () => {
    try {
      setLoadingCard(true);
      const res = await fetch(`${API}/cards/my`, { headers });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showStatus("error", data.message || "Erreur récupération carte");
        setCard(null);
        return;
      }

      setCard(data.card || null);
    } catch (e) {
      showStatus("error", "Impossible de contacter le serveur");
    } finally {
      setLoadingCard(false);
    }
  };

  useEffect(() => {
    fetchCard();
    // eslint-disable-next-line
  }, []);

  // Styles selon statut
  const cardBg = useMemo(() => {
    if (!card) return "from-[#022b53] to-slate-900";
    if (card.status === "FROZEN") return "from-slate-500 to-slate-700";
    if (card.status === "BLOCKED") return "from-red-700 to-red-900";
    return "from-[#022b53] to-slate-900";
  }, [card]);

  const badgeStyle = useMemo(() => {
    if (!card) return "bg-green-500/30";
    if (card.status === "FROZEN") return "bg-yellow-500/30";
    if (card.status === "BLOCKED") return "bg-red-500/30";
    return "bg-green-500/30";
  }, [card]);

  const badgeLabel = useMemo(() => {
    if (!card) return "";
    if (card.status === "FROZEN") return "Gelée";
    if (card.status === "BLOCKED") return "Bloquée";
    return "Active";
  }, [card]);

  const blocked = card?.status === "BLOCKED";

  const createCard = async () => {
    try {
      setActionLoading(true);
      showStatus("loading", "Création...", false);

      const res = await fetch(`${API}/cards/create`, {
        method: "POST",
        headers,
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok)
        return showStatus("error", data.message || "Erreur création carte");

      setCard(data.card);
      showStatus("success", " Carte créée");
    } catch (e) {
      showStatus("error", "Impossible de contacter le serveur");
    } finally {
      setActionLoading(false);
    }
  };

  const toggleFreeze = async () => {
    if (!card) return;

    try {
      setActionLoading(true);
      showStatus("loading", "Mise à jour...", false);

      const res = await fetch(`${API}/cards/${card._id}/freeze`, {
        method: "PATCH",
        headers,
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok)
        return showStatus("error", data.message || "Erreur freeze/unfreeze");

      setCard(data.card);
      showStatus(
        "success",
        data.card?.status === "FROZEN" ? "❄️ Carte gelée" : " Carte dégelée"
      );
    } catch (e) {
      showStatus("error", "Impossible de contacter le serveur");
    } finally {
      setActionLoading(false);
    }
  };

  const block = async () => {
    if (!card) return;
    const ok = window.confirm(
      "Bloquer définitivement la carte ? (irréversible)"
    );
    if (!ok) return;

    try {
      setActionLoading(true);
      showStatus("loading", "Blocage...", false);

      const res = await fetch(`${API}/cards/${card._id}/block`, {
        method: "PATCH",
        headers,
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok)
        return showStatus("error", data.message || "Erreur blocage carte");

      setCard(data.card);
      showStatus("success", " Carte bloquée");
    } catch (e) {
      showStatus("error", "Impossible de contacter le serveur");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Préparer formulaire limites au moment où on ouvre "éditer"
  const openEditLimits = () => {
    if (!card) return;
    setEditLimits(true);
    setLimitsForm({
      daily: String(card.limits?.daily ?? 0),
      monthly: String(card.limits?.monthly ?? 0),
    });
    setFlipped(true); // on se met direct sur le verso
  };

  const saveLimits = async () => {
    if (!card) return;

    const daily = Number(limitsForm.daily);
    const monthly = Number(limitsForm.monthly);

    if (Number.isNaN(daily) || Number.isNaN(monthly)) {
      return showStatus("error", "Limites invalides");
    }
    if (monthly < daily) {
      return showStatus("error", "Le mensuel doit être >= au journalier");
    }

    try {
      setActionLoading(true);
      showStatus("loading", "Enregistrement limites...", false);

      const res = await fetch(`${API}/cards/${card._id}/limits`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ daily, monthly }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        return showStatus("error", data.message || "Erreur update limites");

      setCard(data.card);
      setEditLimits(false);
      showStatus("success", " Limites mises à jour");
    } catch (e) {
      showStatus("error", "Impossible de contacter le serveur");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Ma carte</h2>

      {/* Toast */}
      {status.message && (
        <div
          className={`mb-4 rounded-md px-4 py-2 text-sm border ${
            status.type === "success"
              ? "bg-green-50 text-green-700 border-green-100"
              : status.type === "error"
              ? "bg-red-50 text-red-700 border-red-100"
              : "bg-blue-50 text-blue-700 border-blue-100"
          }`}
        >
          {status.message}
        </div>
      )}

      {loadingCard ? (
        <div className="text-gray-600">Chargement...</div>
      ) : !card ? (
        <button
          onClick={createCard}
          disabled={actionLoading}
          className="px-4 py-2 rounded-lg bg-[#022b53] text-white hover:opacity-90 disabled:opacity-50"
        >
          {actionLoading ? "Création..." : "Créer ma carte"}
        </button>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* ✅ Carte dynamique recto/verso */}
          <div className="w-full max-w-sm">
            {/* container flip */}
            <div
              className="relative w-full h-[280px] sm:h-[300px]"
              style={{ perspective: "1200px" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* RECTO */}
                <div
                  className={`absolute inset-0 rounded-2xl p-5 shadow-lg bg-gradient-to-br ${cardBg} text-white cursor-pointer`}
                  style={{ backfaceVisibility: "hidden" }}
                  onClick={() => setFlipped(true)}
                  title="Clique pour voir le verso"
                >
                  <div className="flex justify-between items-start">
                    <div className="text-sm opacity-90">{card.brand}</div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${badgeStyle}`}
                    >
                      {badgeLabel}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <div className="tracking-widest text-lg">
                      {showNumber
                        ? getFakeFullNumber(card.last4)
                        : `•••• •••• •••• ${card.last4}`}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNumber((prev) => !prev);
                      }}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                      title={
                        showNumber ? "Masquer le numéro" : "Afficher le numéro"
                      }
                    >
                      {showNumber ? (
                        <EyeSlashIcon className="h-5 w-5 text-white" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-white" />
                      )}
                    </button>
                  </div>

                  <div className="mt-12 flex justify-between text-sm">
                    <div>
                      <div className="opacity-70 text-xs">Titulaire</div>
                      <div className="font-semibold">{card.cardholderName}</div>
                    </div>
                    <div className="text-right">
                      <div className="opacity-70 text-xs">Expire</div>
                      <div className="font-semibold">
                        {String(card.expiryMonth).padStart(2, "0")}/
                        {String(card.expiryYear).slice(-2)}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-5 right-5 text-xs opacity-80 text-center">
                    Cliquez pour voir le verso (limites)
                  </div>
                </div>

                {/* VERSO */}
                <div
                  className="absolute inset-0 rounded-2xl p-5 shadow-lg bg-gradient-to-br from-slate-950 to-slate-800 text-white cursor-pointer overflow-y-auto"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                  onClick={() => setFlipped(false)}
                  title="Clique pour revenir au recto"
                >
                  {/* Bande magnétique */}
                  <div className="h-10 bg-black/70 rounded-md" />

                  <div className="mt-4 text-sm font-semibold">
                    Limites de la carte
                  </div>

                  {!editLimits ? (
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="opacity-70">Journalier</span>
                        <span className="font-semibold">
                          {Number(card.limits?.daily ?? 0).toLocaleString()}{" "}
                          FCFA
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Mensuel</span>
                        <span className="font-semibold">
                          {Number(card.limits?.monthly ?? 0).toLocaleString()}{" "}
                          FCFA
                        </span>
                      </div>

                      {blocked && (
                        <div className="mt-3 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2">
                          🔒 Carte bloquée : modification des limites
                          impossible.
                        </div>
                      )}

                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditLimits();
                          }}
                          disabled={blocked || actionLoading}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50"
                        >
                          Modifier
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFlipped(false);
                          }}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                        >
                          Recto
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="mt-3 space-y-3 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div>
                        <label className="block opacity-70 text-xs mb-1">
                          Limite journalier (FCFA)
                        </label>
                        <input
                          value={limitsForm.daily}
                          onChange={(e) =>
                            setLimitsForm((p) => ({
                              ...p,
                              daily: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none"
                          inputMode="numeric"
                        />
                      </div>

                      <div>
                        <label className="block opacity-70 text-xs mb-1">
                          Limite mensuel (FCFA)
                        </label>
                        <input
                          value={limitsForm.monthly}
                          onChange={(e) =>
                            setLimitsForm((p) => ({
                              ...p,
                              monthly: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none"
                          inputMode="numeric"
                        />
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={saveLimits}
                          disabled={actionLoading || blocked}
                          className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50"
                        >
                          {actionLoading ? "Enregistrement..." : "Enregistrer"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditLimits(false)}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-xs opacity-70">
                    Cliquez sur la carte pour revenir au recto
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={toggleFreeze}
              disabled={blocked || actionLoading}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              {actionLoading
                ? "Veuillez patienter..."
                : card.status === "FROZEN"
                ? "Dégeler la carte"
                : "Geler la carte"}
            </button>

            <button
              onClick={block}
              disabled={blocked || actionLoading}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {actionLoading ? "Veuillez patienter..." : "Bloquer la carte"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
