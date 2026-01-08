import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { uploadAvatar, changePassword } from "../services/api";
import PasswordInput from "../components/PasswordInput.jsx";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* =========================
   SVG ICONES
========================= */

// Profil
const SvgUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-4 h-4">
    <path d="M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112z" />
  </svg>
);

// Sécurité
const SvgShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M12 2l7 4v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6z" />
  </svg>
);

// Notifications
const SvgBell = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-4 h-4">
    <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880t42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80z" />
  </svg>
);

// Soleil
const SvgSun = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

// Lune
const SvgMoon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

// Toggle
const ToggleSwitch = ({ label, description, isEnabled, onToggle }) => (
  <div className="flex justify-between items-center mt-5 py-3 border-t">
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <div
      onClick={onToggle}
      className={`w-11 h-6 rounded-full cursor-pointer transition ${isEnabled ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full mt-1 transition ${isEnabled ? "ml-6" : "ml-1"}`}
      />
    </div>
  </div>
);

/* =========================
   SETTINGS
========================= */
export default function Settings() {
  const { user, updateUser } = useAuth();
  const location = useLocation();
  const BACKEND_URL = "http://localhost:5000";
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("profil");
  const [avatarPreview, setAvatarPreview] = useState(null);

  // PROFIL
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState(false);

  // SÉCURITÉ
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notifications
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);

  // Apparence
  const [theme, setTheme] = useState("light");

  /* =========================
     EFFECTS
  ========================= */
  useEffect(() => {
    if (location.state?.tab) setActiveTab(location.state.tab);
  }, [location.state]);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      if (user.avatarUrl) setAvatarPreview(`${BACKEND_URL}${user.avatarUrl}`);
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  /* =========================
     FONCTIONS
  ========================= */

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      const data = await uploadAvatar(file, token);
      const newAvatarUrl = data.avatarUrl || data.user?.avatarUrl || data.avatar || data.user?.avatar;
      if (newAvatarUrl) updateUser({ avatarUrl: newAvatarUrl });
    } catch (err) {
      console.error("Erreur upload avatar :", err);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setSuccess(false);
    try {
      const res = await fetch(`${API_URL}/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fullName, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de la mise à jour");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setSaveError(err.message);
    } finally {
      setSaveLoading(false);
    }
  };

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
      const res = await changePassword({ currentPassword, newPassword }, token);
      setPasswordSuccess(res.message || "Mot de passe mis à jour avec succès.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (err) {
      console.error(err);
      setPasswordError(err.message || "Erreur lors du changement de mot de passe.");
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  /* =========================
     RENDER
  ========================= */
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen mt-15  p-6 md:p-10">
      <div className="mb-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Paramètres</h1>
        <p className="text-gray-500 text-center">Gérez vos préférences et sécurité</p>
      </div>

      <div className="flex flex-col md:flex-row max-w-4xl mx-auto gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-lg rounded-xl p-5 h-fit">
          <h2 className="text-xl font-semibold mb-4 ">Compte</h2>
          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-150 ${
              activeTab === "profil" ? "bg-gray-300 text-[#023053] shadow-md" : "text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("profil")}
          >
            <SvgUser />
            Profil
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mt-1 ${
              activeTab === "securite" ? "bg-gray-300 text-[#023053] shadow-md" : "text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("securite")}
          >
            <SvgShield />
            Sécurité
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mt-1 ${
              activeTab === "notifications" ? "bg-gray-300 text-[#023053] shadow-md" : "text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <SvgBell />
            Notifications
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mt-1 ${
              activeTab === "apparence" ? "bg-gray-300 text-[#023053] shadow-md" : "text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("apparence")}
          >
            <span>🎨 Preference</span>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:flex-grow bg-white shadow-lg rounded-xl p-6">
          {/* PROFIL */}
          {activeTab === "profil" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Informations personnelles</h3>

              {saveError && <div className="mb-3 text-red-600 text-sm font-medium">{saveError}</div>}
              {success && <div className="mb-3 text-green-600 text-sm font-medium">Profil mis à jour avec succès.</div>}

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                  {avatarPreview || user?.avatarUrl ? (
                    <img src={avatarPreview || `${BACKEND_URL}${user.avatarUrl}`} alt="Avatar utilisateur" className="w-full h-full object-cover" />
                  ) : (
                    <span>{fullName ? fullName.charAt(0).toUpperCase() : "?"}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <input type="file" id="avatarInput" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  <button
                    type="button"
                    onClick={() => document.getElementById("avatarInput").click()}
                    className="bg-[#023053] hover:bg-gray-300 hover:text-[#023053] text-white px-4 py-2  rounded-full text-sm font-medium transition duration-150 shadow-md"
                  >
                    Changer la photo
                  </button>
                  <span className="text-xs text-gray-500">JPG, PNG ou GIF. Max 2MB</span>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="grid gap-6 md:grid-cols-2 py-4">
                  <div>
                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-500">Nom complet</label>
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
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-500">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-3 shadow-sm cursor-not-allowed"
                      placeholder="email@example.com"
                      value={email}
                      disabled
                    />
                    <p className="text-xs text-blue-400 mt-1">L’adresse email ne peut pas être modifiée pour des raisons de sécurité.</p>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-500">Telephone</label>
                    <input
                      type="text"
                      id="phone"
                      className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+221 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`col-span-1 sm:col-span-1 mt-4 px-4 py-4 rounded-xl font-semibold w-full flex justify-center items-center gap-2 transition duration-150 ${
                      success ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" : "bg-[#023053] hover:bg-gray-300 text-white shadow-lg hover:text-[#023053]"
                    }`}
                    disabled={saveLoading}
                  >
                    {saveLoading ? "Enregistrement..." : success ? "Enregistré !" : "Enregistrer les modifications"}
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
                {passwordSuccess && <p className="mt-2 text-sm text-green-600">{passwordSuccess}</p>}

                <button
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="w-full sm:w-auto mt-4 px-6 py-2 bg-[#023053] hover:bg-gray-300  text-white hover:text-[#023053] font-medium rounded-xl disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-md"
                >
                  {isSubmittingPassword ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                </button>
              </form>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-2">Préférences de Notifications</h3>
              <ToggleSwitch
                label="Alertes Email"
                description="Recevoir des notifications par email"
                isEnabled={emailNotificationsEnabled}
                onToggle={() => setEmailNotificationsEnabled(!emailNotificationsEnabled)}
              />
            </>
          )}

          {/* APPARENCE */}
          {activeTab === "apparence" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-2">Apparence</h3>
              <div className="flex gap-4">
                <div
                  onClick={() => setTheme("light")}
                  className={`p-4 w-32 text-center rounded-lg cursor-pointer border-2 ${
                    theme === "light" ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  <SvgSun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                  Clair
                </div>

                <div
                  onClick={() => setTheme("dark")}
                  className={`p-4 w-32 text-center rounded-lg cursor-pointer border-2 ${
                    theme === "dark" ? "border-blue-500" : "border-gray-300"
                  } bg-gray-800 text-white`}
                >
                  <SvgMoon className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                  Sombre
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

