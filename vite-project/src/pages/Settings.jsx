import React, { useState } from "react";
// Les icônes Fa* ont été remplacées par des SVG inline pour résoudre l'erreur de dépendance.

// --- SVGs INLINE (Remplacent react-icons) ---

// SVG pour FaUser (Profil)
const SvgUser = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"  viewBox="0 -960 960 960" ><path d="M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320"/></svg>
);

// SVG pour FaShieldAlt (Sécurité)
const SvgShield = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM8 12h.01M12 12h.01M16 12h.01"/></svg>

);

// SVG pour FaBell (Notifications)
const SvgBell = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 -960 960 960"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880t42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80zM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80M320-280h320v-280q0-66-47-113t-113-47-113 47-47 113z"/></svg> 
);

// SVG pour FaPaintBrush (preference)
const SvgPaintBrush = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
);

// SVG pour FaEye (Afficher)
const SvgEye = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path fillRule="evenodd" d="M1.323 11.498a.75.75 0 010-1.496l.666-.333A18.508 18.508 0 0112 5.051c2.813 0 5.467.576 7.822 1.518l.666.333a.75.75 0 010 1.496l-.666.333c-2.355.942-5.009 1.518-7.822 1.518s-5.467-.576-7.822-1.518l-.666-.333z" clipRule="evenodd" />
  </svg>
);

// SVG pour FaEyeSlash (Masquer)
const SvgEyeSlash = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3.53 2.441a.75.75 0 00-1.06 1.06l16.12 16.12a.75.75 0 101.06-1.06L4.59 2.441a.75.75 0 00-1.06 0zm15.786 8.52a.75.75 0 00-1.06 0c-1.854 1.854-4.223 2.924-6.256 3.033l1.832 1.832c3.04-2.128 5.712-4.664 7.022-7.07.03-.04.06-.09.09-.14a.75.75 0 00-.73-.974zM12.025 15.688c-1.854 0-3.593-.687-4.954-2.048L3.25 16.592a.75.75 0 001.06 1.06c1.111-1.112 2.418-2.028 3.863-2.61l.14-.055a15.753 15.753 0 012.712-.516l2.122 2.121c-.815.01-1.63-.037-2.437-.145a5.952 5.952 0 01-1.543-.377L13.78 17.5a18.514 18.514 0 01-1.755.228.75.75 0 00-.075 1.5l.075-.001a18.514 18.514 0 002.58-.335l2.457 2.457a.75.75 0 001.06-1.06L14.77 18.665l.555-.555c1.455.582 2.902 1.002 4.414 1.258a.75.75 0 00.748-1.296c-.198-.109-.4-.216-.605-.319L20.8 17.5a.75.75 0 00-.707-1.353l-.117.061A19.982 19.982 0 0012.025 15.688z" />
    <path fillRule="evenodd" d="M12.025 6.094a.75.75 0 00.75-.75v-.5a.75.75 0 00-1.5 0v.5a.75.75 0 00.75.75z" clipRule="evenodd" />
    <path d="M12.025 8.344a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75z" />
  </svg>
);
// --- FIN SVGs INLINE ---


// --- Sous-composant : Toggle Switch avec Tailwind ---
const ToggleSwitch = ({ label, description, isEnabled, onToggle }) => {
  return (
    <div className="flex justify-between items-center mt-5 py-3 border-t border-gray-100">
      <div>
        <div className="font-semibold text-gray-800">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      
      {/* Le bouton / switch lui-même */}
      <div
        onClick={onToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ease-in-out ${
          isEnabled ? 'bg-blue-600' : 'bg-gray-300'
        } shadow-inner`}
        aria-checked={isEnabled}
        role="switch"
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out shadow ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
    </div>
  );
};

// --- Sous-composant : Champ de mot de passe avec icône ---
const PasswordInput = ({ label, value, onChange, showPassword, toggleShowPassword }) => {
  return (
    <div className="mb-4 mt-5">
      <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-xl p-3 shadow-sm focus-within:ring-1 focus-within:ring-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-lock text-gray-500" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
</svg>
        
        <input
          className="grow  border-none outline-none text-base focus:ring-0"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder="Entrez votre mot de passe"
          required
        />
        <span 
          className="text-gray-500 cursor-pointer ml-3" 
          onClick={toggleShowPassword}
        >
          {/* Utilisation des SVGs remplacés */}
        
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
        </span>
      </div>
    </div>
  );
};


// --- Composant Principal : Settings ---
export default function Settings() {
  const [activeTab, setActiveTab] = useState("profil");
  const [success, setSuccess] = useState(false);
  
  // États pour la section PROFIL
  const [fullName, setFullName] = useState("Mohamed Dione");
  const [email, setEmail] = useState("mohameddione14@gmail.com");
  const [phone, setPhone] = useState("+221 76 370 81 64");
  const [address, setAddress] = useState("HLM grand yoff villa N°10");

  // États pour la section SÉCURITÉ
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);


  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Profil mis à jour');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };
  
  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    console.log('Changement de mot de passe soumis');
    // NOTE: Remplacer alert() par un modal ou message d'erreur dans l'UI réelle.
    alert('Mot de passe mis à jour (simulation) - Note: Les alerts doivent être remplacés par un messagebox.'); 
    if (newPassword !== confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas !");
      return;
    }
    // Logique d'API ici
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };


  return (
    <div className="min-h-screen mt-5 bg-gray-50 p-6 md:p-10">
      
      {/* En-tête (Centré ou ajusté pour mobile) */}
      <div className="mb-6 max-w-4xl mx-auto md:ml-0">
        <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
        <p className="text-gray-500">Gérez vos préférences et sécurité</p>
      </div>

      <div className="flex flex-col md:flex-row max-w-4xl mx-auto gap-6">

        {/* Card 1: Navigation Latérale */}
        <div className="w-full md:w-64 bg-white shadow-lg rounded-xl p-5 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Compte</h2>

          {/* Onglet Profil */}
          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-150 ${
              activeTab === "profil" 
                ? "bg-blue-300 text-blue-500 shadow-md" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("profil")}
          >
            <SvgUser className="w-4 h-4" />
            <span>Profil</span>
          </div>

          {/* Onglet Sécurité */}
          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-150 mt-1 ${
              activeTab === "securite" 
                ? "bg-blue-300 text-blue-500 shadow-md" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("securite")}
          >
            <SvgShield className="w-4 h-4" />
            <span>Sécurité</span>
          </div>

          {/* Onglet Notifications */}
          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-150 mt-1 ${
              activeTab === "notifications" 
                ? "bg-blue-300 text-blue-500 shadow-md" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <SvgBell className="w-4 h-4" />
            <span>Notifications</span>
          </div>

          {/* Onglet Preference */}
          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-150 mt-1 ${
              activeTab === "apparence" 
                ? "bg-blue-300 text-blue-500 shadow-md" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("apparence")}
          >
            <SvgPaintBrush className="w-4 h-4" />
            <span>Preference</span>
          </div>
        </div>

        {/* Card 2: Contenu des Onglets */}
        <div className="w-full md: `flex-grow bg-white shadow-lg rounded-xl p-6">
          
          {/* PROFIL */}
          {activeTab === "profil" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Informations personnelles</h3>
              
              {/* Avatar et bouton de changement */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 relative">
                {/* Avatar avec la lettre J */}
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-cyan-300 via-blue-500 to-indigo-700 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                  J
                </div>

                <div className="flex flex-col gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-150 shadow-md">
                    Changer la photo
                  </button>
                  <span className="text-xs text-gray-500">JPG, PNG ou GIF. Max 2MB</span>
                </div>
              </div>

              {/* Formulaire de profil */}
              <form onSubmit={handleProfileSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-500">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Mohamed Dione"
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
                      className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="mohameddione14@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-500">
                      Telephone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+221 76 370 81 64"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-500">
                      Adresse
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="HLM grand yoff villa N°10"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  

                <button
  type="submit"
  className={`col-span-1 sm:col-span-1 mt-4 px-4 py-3 rounded-xl font-semibold 
              w-full flex justify-center items-center gap-2
              transition duration-150
              ${
                success 
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              }`}
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    fill="currentColor" 
    viewBox="0 0 16 16"
  >
    <path d="M11 2H9v3h2z"/>
    <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
  </svg>

  {success ? "Enregistré !" : "Enregistrer les modifications"}
</button>

                </div>
              </form>
            </>
          )}

          {/* SÉCURITÉ */}
          {activeTab === "securite" && (
             <>
                {/* --- Section Changer le mot de passe --- */}
                <div className="mb-8">
                  <h4 className="text-md text-md text-gray-700 mb-4">Sécurité</h4>
                  <h4 className="text-md text-md text-gray-700 mb-4">Changer le mot de passe</h4>
                  
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

                    <button 
                      type="submit" 
                      className="w-full sm:w-auto mt-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-150 ease-in-out shadow-md"
                    >
                      Mettre à jour le mot de passe
                    </button>
                  </form>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* --- Section Authentification à deux facteurs --- */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Authentification à deux facteurs</h4>
                  
                  <ToggleSwitch
                    label="Authentification 2FA"
                    description="Code par SMS ou email"
                    isEnabled={twoFactorAuthEnabled}
                    onToggle={() => setTwoFactorAuthEnabled(!twoFactorAuthEnabled)}
                  />
                  
                  <ToggleSwitch
                    label="Biométrie"
                    description="Empreinte digitale ou Face ID"
                    isEnabled={biometricsEnabled}
                    onToggle={() => setBiometricsEnabled(!biometricsEnabled)}
                  />
                </div>

              </>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Préférences de Notifications</h3>
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
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Personnalisation de l'Apparence</h3>
              <div className="pt-2">
                  <p className="text-gray-600 mb-4">Choisissez votre thème préféré pour l'interface utilisateur.</p>
                  
                  <div className="flex gap-4">
                      {/* Thème Clair */}
                      <div className="p-4 border-2 border-blue-500 rounded-lg cursor-pointer w-32 text-center shadow-md">
                          <SvgPaintBrush className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                          <p className="font-medium text-sm">Clair (Défaut)</p>
                      </div>
                      
                      {/* Thème Sombre */}
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