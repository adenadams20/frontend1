import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { uploadAvatar, changePassword } from "../services/api";
import PasswordInput from "../components/PasswordInput.jsx";

// URL backend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// SVG Profil
const SvgUser = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 -960 960 960" {...props}>
    <path d="M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320" />
  </svg>
);

// SVG Sécurité
const SvgShield = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM8 12h.01M12 12h.01M16 12h.01" />
  </svg>
);

// SVG Notifications
const SvgBell = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 -960 960 960" {...props}>
    <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880t42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80zM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80M320-280h320v-280q0-66-47-113t-113-47-113 47-47 113z" />
  </svg>
);

// SVG Apparence clair
const SvgSun = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 7.464M12 6a6 6 0 100 12 6 6 0 000-12z" />
  </svg>
);

// SVG Apparence sombre
const SvgMoon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
  </svg>
);

// SVG PaintBrush (Préférence)
const SvgPaintBrush = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    {...props}
  >
    {/* Manche du pinceau */}
    <path d="M14 3l7 7" />

    {/* Tête du pinceau */}
    <path d="M10 7l7 7" />

    {/* Poils */}
    <path d="M3 21c2-2 5-2 7 0 2 2 5 2 7 0" />
  </svg>
);

// Toggle Switch
const ToggleSwitch = ({ label, description, isEnabled, onToggle }) => (
  <div className="flex justify-between items-center mt-5 py-3 border-t border-gray-100">
    <div>
      <div className="font-semibold text-gray-800">{label}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
    <div
      onClick={onToggle}
      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ease-in-out ${isEnabled ? "bg-blue-600" : "bg-gray-300"} shadow-inner`}
      role="switch"
      aria-checked={isEnabled}
    >
      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out shadow ${isEnabled ? "translate-x-6" : "translate-x-1"}`} />
    </div>
  </div>
);

export default function Settings() {
  const { user, setUser, updateUser } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profil");

  // PROFIL
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
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

  // NOTIFICATIONS
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // APPARENCE
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  // Pré-remplir infos utilisateur
  useEffect(() => { if (location.state?.tab) setActiveTab(location.state.tab); }, [location.state]);
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
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (!user) return <Navigate to="/login" replace />;

  // Avatar
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    const token = localStorage.getItem("token");
    const data = await uploadAvatar(file, token);
    const newAvatarUrl = data.avatarUrl || data.user?.avatarUrl;
    if (newAvatarUrl) updateUser({ avatarUrl: newAvatarUrl });
  };
  console.log("URL upload avatar:", `${BACKEND_URL}/upload/avatar`);

  // Update profil
  const handleProfileSubmit = async (e) => {
    e.preventDefault(); setSaveError(""); setSuccess(false);
    const token = localStorage.getItem("token");
    try {
      setSaveLoading(true);
      const res = await updateUser({ fullName, phone }, token);
      if (res.profile) setUser((prev) => ({ ...prev, fullName: res.profile.fullName, phone: res.profile.phone }));
      setSuccess(true); setTimeout(() => setSuccess(false), 3000);
    } catch (err) { setSaveError(err.message || "Erreur lors de la mise à jour du profil."); }
    finally { setSaveLoading(false); }
  };

  // Change password
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault(); setPasswordError(""); setPasswordSuccess("");
    if (!currentPassword || !newPassword || !confirmPassword) return setPasswordError("Veuillez remplir tous les champs.");
    if (newPassword !== confirmPassword) return setPasswordError("La confirmation ne correspond pas.");
    if (newPassword.length < 8) return setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
    try {
      setIsSubmittingPassword(true);
      const token = localStorage.getItem("token");
      const res = await changePassword({ currentPassword, newPassword }, token);
      setPasswordSuccess(res.message || "Mot de passe mis à jour avec succès.");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setShowCurrentPassword(false); setShowNewPassword(false); setShowConfirmPassword(false);
    } catch (err) { setPasswordError(err.message || "Erreur lors du changement de mot de passe."); }
    finally { setIsSubmittingPassword(false); }
  };

  return (
    <div className="min-h-screen mt-24 w-full">
      <div className="mb-6 max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
        <p className="text-gray-500">Gérez vos préférences et sécurité</p>
      </div>

      <div className="flex flex-col md:flex-row max-w-4xl mx-auto gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-lg rounded-xl p-5 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Compte</h2>
          <div onClick={() => setActiveTab("profil")} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${activeTab === "profil" ? "bg-[#022b53] text-white shadow-md" : "text-[#022b53] hover:bg-gray-300"}`}><SvgUser /> <span>Profil</span></div>
          <div onClick={() => setActiveTab("securite")} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition mt-1 ${activeTab === "securite" ? "bg-[#022b53] text-white shadow-md" : "text-[#022b53] hover:bg-gray-300"}`}><SvgShield /> <span>Sécurité</span></div>
          <div onClick={() => setActiveTab("notifications")} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition mt-1 ${activeTab === "notifications" ? "bg-[#022b53] text-white shadow-md" : "text-[#022b53] hover:bg-gray-300"}`}><SvgBell /> <span>Notifications</span></div>
          <div onClick={() => setActiveTab("apparence")} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition mt-1 ${activeTab === "apparence" ? "bg-[#022b53] text-white shadow-md" : "text-[#022b53] hover:bg-gray-300"}`}><SvgPaintBrush /> <span>Préférence</span></div>
        </div>

        {/* Content */}
        <div className="w-full md:flex-grow bg-white shadow-lg rounded-xl p-6">
          {/* PROFIL */}
          {activeTab === "profil" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Informations personnelles</h3>
              {saveError && <div className="mb-3 text-red-600 text-sm font-medium">{saveError}</div>}
              {success && <div className="mb-3 text-green-600 text-sm font-medium">Profil mis à jour avec succès.</div>}

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                  {avatarPreview || user.avatarUrl ? <img src={avatarPreview || `${BACKEND_URL}${user.avatarUrl}`} className="w-full h-full object-cover" /> : <span>{fullName?.charAt(0).toUpperCase()}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <input type="file" id="avatarInput" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  <button type="button" onClick={() => document.getElementById("avatarInput").click()} className="bg-[#022b53] hover:bg-gray-300 hover:text-[#022b53] text-white px-4 py-2 rounded-full text-sm font-medium transition duration-150 shadow-md">Changer la photo</button>
                  <span className="text-xs text-gray-500">JPG, PNG ou GIF. Max 2MB</span>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="grid gap-6 md:grid-cols-2 py-4">
                  <div>
                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-500">Nom complet</label>
                    <input type="text" id="full_name" className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-3 shadow-sm focus:ring-blue-500 focus:border-blue-500" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-500">Email</label>
                    <input type="email" id="email" className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-3 shadow-sm cursor-not-allowed" value={email} disabled />
                    <p className="text-xs text-blue-400 mt-1">L’adresse email ne peut pas être modifiée pour des raisons de sécurité.</p>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-500">Telephone</label>
                    <input type="text" id="phone" className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-3 shadow-sm focus:ring-blue-500 focus:border-blue-500" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>

                  <button type="submit" disabled={saveLoading} className={`col-span-1 sm:col-span-1 mt-4 px-4 py-4 rounded-xl font-semibold w-full flex justify-center items-center gap-2 transition duration-150 ${success ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" : "bg-[#022b53] hover:bg-gray-300 hover:text-[#022b53] text-white mt-5 shadow-lg"}`}>
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
                <PasswordInput label="Mot de passe actuel" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} showPassword={showCurrentPassword} toggleShowPassword={() => setShowCurrentPassword(!showCurrentPassword)} />
                <PasswordInput label="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} showPassword={showNewPassword} toggleShowPassword={() => setShowNewPassword(!showNewPassword)} />
                <PasswordInput label="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} showPassword={showConfirmPassword} toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)} />
                {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
                {passwordSuccess && <p className="mt-2 text-sm text-green-600">{passwordSuccess}</p>}
                <button type="submit" disabled={isSubmittingPassword} className="w-full sm:w-auto mt-4 px-6 py-2 bg-[#022b53] text-white font-medium rounded-xl hover:bg-gray-300 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-md">{isSubmittingPassword ? "Mise à jour..." : "Mettre à jour le mot de passe"}</button>
              </form>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Préférences de Notifications</h3>
              <div className="space-y-4 pt-2">
                <ToggleSwitch label="Alertes Email" description="Recevez des notifications importantes par email." isEnabled={notificationsEnabled} onToggle={() => setNotificationsEnabled(!notificationsEnabled)} />
              </div>
            </>
          )}

          {/* APPARENCE */}
          {activeTab === "apparence" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Personnalisation de l'Apparence</h3>
              <p className="text-gray-600 mb-4">Choisissez votre thème préféré pour l'interface utilisateur.</p>
              <div className="flex gap-4">
                <div onClick={() => setDarkMode(false)} className={`p-4 border rounded-lg cursor-pointer w-32 text-center shadow-md transition ${!darkMode ? "border-blue-500" : "border-gray-300 bg-gray-100 text-gray-800"} hover:shadow-lg`}>
                  <SvgSun className={`w-6 h-6 mx-auto mb-2 transition ${!darkMode ? "text-blue-500" : "text-gray-400"}`} />
                  <p className="font-medium text-sm">Clair (Défaut)</p>
                </div>
                <div onClick={() => setDarkMode(true)} className={`p-4 border rounded-lg cursor-pointer w-32 text-center shadow-md transition ${darkMode ? "border-blue-500 bg-gray-800 text-white" : "border-gray-300 bg-gray-100 text-gray-800"} hover:shadow-lg`}>
                  <SvgMoon className={`w-6 h-6 mx-auto mb-2 transition ${darkMode ? "text-blue-500" : "text-gray-400"}`} />
                  <p className="font-medium text-sm">Sombre</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
