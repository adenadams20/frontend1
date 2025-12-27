import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { updateUser } from "../services/api.js";
import { uploadAvatar } from "../services/api";
import { changePassword } from "../services/api";
import PasswordInput from "../components/PasswordInput.jsx";

import { useLocation } from "react-router-dom";

import axios from "axios"; //ajouter
// SVG pour FaUser (Profil)
const SvgUser = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 -960 960 960">
    <path d="M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320" />
  </svg>
);

// SVG pour FaShieldAlt (Sécurité)
const SvgShield = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM8 12h.01M12 12h.01M16 12h.01" />
  </svg>
);

// SVG pour FaBell (Notifications)
const SvgBell = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 -960 960 960">
    <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880t42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80zM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80M320-280h320v-280q0-66-47-113t-113-47-113 47-47 113z" />
  </svg>
);

// SVG pour FaPaintBrush (preference)
const SvgPaintBrush = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
  </svg>
);

// --- Sous-composant : Toggle Switch avec Tailwind ---
const ToggleSwitch = ({ label, description, isEnabled, onToggle }) => {
  return (
    <div className="flex justify-between items-center mt-5 py-3 border-t border-gray-100">
      <div>
        <div className="font-semibold text-gray-800">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>

      <div
        onClick={onToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ease-in-out ${
          isEnabled ? "bg-blue-600" : "bg-gray-300"
        } shadow-inner`}
        aria-checked={isEnabled}
        role="switch"
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out shadow ${
            isEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </div>
    </div>
  );
};

// --- Composant Principal : Settings ---
export default function Settings() {
  const [activeTab, setActiveTab] = useState("profil");
  const [success, setSuccess] = useState(false);

  // ✅ URL backend (utilisé pour /uploads)
  const BACKEND_URL = "http://localhost:5000";

  // ⬅ Récuperation du user connecté via AuthContext
  const { user, setUser } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState(null);

  // États pour la section PROFIL
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState("");

  // États pour la section SÉCURITÉ
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  //ajouter
  const location = useLocation();

useEffect(() => {
  if (location.state?.tab) {
    setActiveTab(location.state.tab); // ex: "profil"
  }
}, [location.state]);


  //  FONCTION changer mot de passe
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Veuillez remplir tous les champs.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("La confirmation du mot de passe ne correspond pas.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      setIsSubmittingPassword(true);

      const token = localStorage.getItem("token");
      console.log("🟢 TOKEN UTILISÉ POUR CHANGE PASSWORD :", token);

      const res = await changePassword({ currentPassword, newPassword }, token);

      console.log("✅ RÉPONSE CHANGE PASSWORD :", res);

      setPasswordSuccess(res.message || "Mot de passe mis à jour avec succès.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      console.error("❌ ERREUR CHANGE PASSWORD FRONT :", error);
      setPasswordError(
        error.message || "Une erreur est survenue lors du changement de mot de passe."
      );
    } finally {
      setIsSubmittingPassword(false);
    }
  };

const { updateUser } = useAuth();
const token = localStorage.getItem("token"); // ✅ ou depuis useAuth si tu l’y mets

const handleAvatarChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!token) {
    console.error("Token absent : utilisateur non connecté");
    return;
  }

  try {
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    const data = await uploadAvatar(file, token);
    console.log("Upload avatar response:", data);

    const newAvatarUrl =
      data.avatarUrl ||
      data.user?.avatarUrl ||
      data.avatar ||
      data.user?.avatar;

    if (!newAvatarUrl) {
      console.error("Le backend n'a pas renvoyé avatarUrl :", data);
      return;
    }

    updateUser({ avatarUrl: newAvatarUrl }); // ✅ déclenche re-render Navbar
  } catch (err) {
    console.error("Erreur upload avatar :", err);
  }
};

  // 🔁 Pré-remplir les champs profil à partir du user connecté
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");

      if (user.avatarUrl) {
        // ✅ corrige: template string
        setAvatarPreview(`${BACKEND_URL}${user.avatarUrl}`);
      }
    }
  }, [user]);

  // 🔒 Bloquer l'accès si pas connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");
    setSuccess(false);

    const token = localStorage.getItem("token");
    if (!token) {
      setSaveError("Vous n'êtes pas connecté.");
      return;
    }

    const payload = { fullName, phone };

    try {
      setSaveLoading(true);

      const res = await updateUser(payload, token);

      if (res.profile) {
        setUser((prev) => ({
          ...prev,
          fullName: res.profile.fullName,
          phone: res.profile.phone,
        }));
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Erreur update profil :", err);
      setSaveError(err.message || "Erreur lors de la mise à jour du profil.");
    } finally {
      setSaveLoading(false);
    }
  };

  //ajouter pour les notification avec mails
  

  return (
    <div className="min-h-screen mt-18 bg-gray-50  w-full">
      {/* En-tête */}
      <div className="mb-6 max-w-5xl mx-auto md:ml-0">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Paramètres</h1>
        <p className="text-gray-500 text-center">Gérez vos préférences et sécurité</p>
      </div>

      <div className="flex flex-col md:flex-row max-w-4xl mx-auto gap-6">
        {/* Navigation latérale */}
        <div className="w-full md:w-64 bg-white shadow-lg rounded-xl p-5 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Compte</h2>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-150 ${
              activeTab === "profil"
                ? "bg-[#022b53] text-yellow-100 shadow-md"
                : "text-[#022b53] hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("profil")}
          >
            <SvgUser className="w-4 h-4" />
            <span>Profil</span>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-150 mt-1 ${
              activeTab === "securite"
                ? "bg-[#022b53] text-white shadow-md"
                : "text-[#022b53] hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("securite")}
          >
            <SvgShield className="w-4 h-4" />
            <span>Sécurité</span>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-150 mt-1 ${
              activeTab === "notifications"
                ? "bg-[#022b53] text-white shadow-md"
                : "text-[#022b53] hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <SvgBell className="w-4 h-4" />
            <span>Notifications</span>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-150 mt-1 ${
              activeTab === "apparence"
                ? "bg-[#022b53] text-white shadow-md"
                : "text-[#022b53] hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("apparence")}
          >
            <SvgPaintBrush className="w-4 h-4" />
            <span>Preference</span>
          </div>
        </div>

        {/* ✅ Correction className (backtick cassé) */}
        <div className="w-full md:flex-grow bg-white shadow-lg rounded-xl p-6">
          {/* PROFIL */}
          {activeTab === "profil" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Informations personnelles
              </h3>

              {saveError && (
                <div className="mb-3 text-red-600 text-sm font-medium">{saveError}</div>
              )}

              {success && (
                <div className="mb-3 text-green-600 text-sm font-medium">
                  Profil mis à jour avec succès.
                </div>
              )}

              {/* Avatar + changement photo */}
<div className="flex flex-col sm:flex-row items-center gap-4 mb-6 relative">
  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-white text-3xl font-bold shrink-0">
    {(avatarPreview || user?.avatarUrl) ? (
      <img
        src={avatarPreview || `${BACKEND_URL}${user.avatarUrl}`}
        alt="Avatar utilisateur"
        className="w-full h-full object-cover"
      />
    ) : (
      <span>{fullName ? fullName.charAt(0).toUpperCase() : "?"}</span>
    )}
  </div>

  <div className="flex flex-col gap-2">
    <input
      type="file"
      id="avatarInput"
      accept="image/*"
      className="hidden"
      onChange={handleAvatarChange}
    />

    <button
      type="button"
      onClick={() => document.getElementById("avatarInput").click()}
      className="bg-[#022b53] hover:bg-gray-300 hover:text-[#022b53] text-yellow-100 px-4 py-2 rounded-full text-sm font-medium transition duration-150 shadow-md"
    >
      Changer la photo
    </button>

    <span className="text-xs text-gray-500">JPG, PNG ou GIF. Max 2MB</span>
  </div>
</div>


              {/* Formulaire profil */}
              <form onSubmit={handleProfileSubmit}>
                <div className="grid gap-6 md:grid-cols-2 py-4">
                  <div>
                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-500">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nom complet"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-3 shadow-sm cursor-not-allowed"
                      placeholder="email@example.com"
                      value={email}
                      disabled
                    />
                    <p className="text-xs text-blue-400 mt-1">
                      L’adresse email ne peut pas être modifiée pour des raisons de sécurité.
                    </p>
                  </div>

                  <div className="">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-500">
                      Telephone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+221 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <br />

                  <button
                    type="submit"
                    className={`col-span-1 sm:col-span-1 mt-4 px-4 py-4 rounded-xl font-semibold 
                      w-full flex justify-center items-center gap-2 
                      transition duration-150
                      ${
                        success
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-lg"
                          : "bg-[#022b53] hover:bg-gray-300 hover:text-[#022b53] text-yellow-100 mt-5 shadow-lg"
                      }`}
                    disabled={saveLoading}
                  >
                    {saveLoading
                      ? "Enregistrement..."
                      : success
                      ? "Enregistré !"
                      : "Enregistrer les modifications"}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* SÉCURITÉ */}
          {activeTab === "securite" && (
            <div className="mb-8">
              <h4 className="text-md text-gray-700 mb-4">Sécurité</h4>
              <h4 className="text-md text-gray-700 mb-4">Changer le mot de passe</h4>

              <form onSubmit={handlePasswordChangeSubmit}>
                <PasswordInput
                  label="Mot de passe actuel"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  showPassword={showCurrentPassword}
                  toggleShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}
                />

                <PasswordInput
                  label="Nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  showPassword={showNewPassword}
                  toggleShowPassword={() => setShowNewPassword(!showNewPassword)}
                />

                <PasswordInput
                  label="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showPassword={showConfirmPassword}
                  toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />

                {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}

                {passwordSuccess && (
                  <p className="mt-2 text-sm text-green-600">{passwordSuccess}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="w-full sm:w-auto mt-4 px-6 py-2 bg-[#022b53] text-white font-medium rounded-xl hover:bg-gray-300 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-md"
                >
                  {isSubmittingPassword ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                </button>
              </form>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Préférences de Notifications
              </h3>
              <div className="space-y-4 pt-2">
                <ToggleSwitch
                  label="Alertes Email"
                  description="Recevez des notifications importantes par email."
                  isEnabled={true}
                  onToggle={() => {}}
                />
                <ToggleSwitch
                  label="Notifications Push"
                  description="Recevez des notifications en temps réel sur votre appareil."
                  isEnabled={false}
                  onToggle={() => {}}
                />
                <ToggleSwitch
                  label="Mises à jour promotionnelles"
                  description="Recevez des informations sur les nouveaux produits et offres."
                  isEnabled={true}
                  onToggle={() => {}}
                />
              </div>
            </>
          )}

          {/* APPARENCE */}
          {activeTab === "apparence" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Personnalisation de l'Apparence
              </h3>
              <div className="pt-2">
                <p className="text-gray-600 mb-4">
                  Choisissez votre thème préféré pour l'interface utilisateur.
                </p>

                <div className="flex gap-4">
                  <div className="p-4 border-2 border-blue-500 rounded-lg cursor-pointer w-32 text-center shadow-md">
                    <SvgPaintBrush className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <p className="font-medium text-sm">Clair (Défaut)</p>
                  </div>

                  <div className="p-4 border border-gray-300 rounded-lg cursor-pointer w-32 text-center bg-gray-800 text-white shadow-md hover:border-gray-500">
                    <SvgPaintBrush className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <p className="font-medium text-sm">Sombre</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}