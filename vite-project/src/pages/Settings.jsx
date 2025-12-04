import React, { useState } from "react";
// Importations d'icônes
import { LuShield } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiGlobalLine, RiSunLine } from "react-icons/ri"; 
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

// --- Sous-composant : Toggle Switch (Inchangé) ---
const ToggleSwitch = ({ label, description, isEnabled, onToggle, icon: Icon }) => {
    return (
        <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
                {Icon && <Icon className="w-5 h-5 mr-3 text-gray-600 shrink-0" />}
                <div>
                    <div className="font-semibold text-gray-800">{label}</div>
                    <div className="text-sm text-gray-500">{description}</div>
                </div>
            </div>

            <div
                onClick={onToggle}
                className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ease-in-out ${
                    isEnabled ? 'bg-blue-600' : 'bg-gray-300'
                } shadow-inner shrink-0`}
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


// --- Sous-composant : Champ de mot de passe (Inchangé) ---
const PasswordInput = ({ label, value, onChange, showPassword, toggleShowPassword, isConfirm = false }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="flex items-center border border-gray-300 rounded-xl p-3 shadow-sm focus-within:ring-1 focus-within:ring-blue-500">
                <FiLock className="text-gray-400 text-xl mr-3 shrink-0" />

                <input
                    className="grow border-none outline-none text-base focus:ring-0 w-full p-0"
                    type={isConfirm ? 'password' : (showPassword ? 'text' : 'password')} 
                    value={value}
                    onChange={onChange}
                />
                {!isConfirm && ( 
                    <span
                        className="text-gray-500 cursor-pointer ml-3 shrink-0"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaRegEye className="w-5 h-5" />}
                    </span>
                )}
            </div>
        </div>
    );
};


// --- Composant Principal : Settings ---
export default function Settings() {
    const [activeTab, setActiveTab] = useState("preference");
    const [success, setSuccess] = useState(false);

    // États du composant (simplifiés)
    const [fullName, setFullName] = useState("Mohamed Dione");
    const [email, setEmail] = useState("mohameddione14@gmail.com");
    const [phone, setPhone] = useState("+221 76 370 81 64");
    const [address, setAddress] = useState("HLM grand yoff villa N°10");

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);

    const [transactionAlertsEnabled, setTransactionAlertsEnabled] = useState(true);
    const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
    const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
    const [marketingEmailsEnabled, setMarketingEmailsEnabled] = useState(true);
    
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('Français');
    const [selectedCurrency, setSelectedCurrency] = useState('EUR (€)');

    // Fonctions de soumission (simulées)
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const handlePasswordChangeSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Les nouveaux mots de passe ne correspondent pas !");
            return;
        }
        alert('Mot de passe mis à jour (simulation)');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };
    
    // Composant de Navigation
    const NavItem = ({ icon: Icon, tabName, label }) => {
        const isActive = activeTab === tabName;
        return (
            <div
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition duration-150 mt-1 ${
                    isActive
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tabName)}
            >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
            </div>
        );
    };
    
    // --- Rendu Principal ---
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">

            <div className="mb-6 max-w-4xl mx-auto">
                <h5 className="text-2xl font-semibold text-gray-800">Paramètres</h5>
                <p className="text-gray-500">Gérez vos préférences et sécurité</p>
            </div>

            <div className="flex flex-col md:flex-row max-w-4xl mx-auto gap-6">

                {/* Navigation Latérale */}
                <div className="md:w-58 bg-white shadow-lg rounded-xl p-3 h-fit shrink-0">
                    <NavItem icon={BsPerson} tabName="profil" label ="Profil"/> 
                    <NavItem icon={LuShield} tabName="securite" label ="Sécurité" />
                    <NavItem icon={IoNotificationsOutline} tabName="notifications" label="Notifications" />
                    <NavItem icon={RiGlobalLine} tabName="preference" label="Préférences" />
                </div>

                {/* Contenu des Onglets */}
                <div className="w-full grow bg-white shadow-lg rounded-xl p-6">

                    {/* Contenu PROFIL (pour la complétude) */}
                    {activeTab === "profil" && (
                        <>
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Informations personnelles</h3>
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                                <div className="w-20 h-20 rounded-full bg-linear-to-br from-cyan-300 via-blue-500 to-indigo-700 flex items-center justify-center text-white text-2xl shrink-0">
                                    {fullName ? fullName[0].toUpperCase() : 'J'}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-150 shadow-md">Changer la photo</button>
                                    <span className="text-xs text-gray-500">JPG, PNG ou GIF. Max 2MB</span>
                                </div>
                            </div>
                            <form onSubmit={handleProfileSubmit}>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div><label htmlFor="full_name" className="block mb-2 text-sm text-gray-600">Nom complet</label><input type="text" id="full_name" className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
                                    <div><label htmlFor="email" className="block mb-2 text-sm text-gray-600">Email</label><input type="email" id="email" className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                    <div><label htmlFor="phone" className="block mb-2 text-sm text-gray-600">Téléphone</label><input type="text" id="phone" className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                                    <div><label htmlFor="address" className="block mb-2 text-sm text-gray-600">Adresse</label><input type="text" id="address" className="text-gray-800 border border-gray-300 rounded-xl block w-full px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
                                </div>
                                <button type="submit" className={`col-span-1 sm:col-span-1 mt-6 px-4 py-3 rounded-xl font-semibold w-full md:w-auto flex justify-center items-center gap-2 transition duration-150 ${success ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"}`}>{success ? "Enregistré avec succès !" : "Enregistrer les modifications"}</button>
                            </form>
                        </>
                    )}

                    {/* 🛡️ Contenu SÉCURITÉ (Structure Plate) */}
                    {activeTab === "securite" && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800">Sécurité et Connexion</h3>
                            
                            {/* Section Mot de passe */}
                            <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
                                <h4 className="font-semibold text-gray-700 mb-4">Changer le mot de passe</h4>
                                <form onSubmit={handlePasswordChangeSubmit}>
                                    <PasswordInput label="Mot de passe actuel" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} showPassword={showCurrentPassword} toggleShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}/>
                                    <PasswordInput label="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} showPassword={showNewPassword} toggleShowPassword={() => setShowNewPassword(!showNewPassword)}/>
                                    <PasswordInput label="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} isConfirm={true} />
                                    <button type="submit" className="w-full md:w-auto mt-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-150 ease-in-out shadow-lg">Mettre à jour le mot de passe</button>
                                </form>
                            </div>
                            
                            {/* Section 2FA */}
                            <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
                                <h4 className="font-semibold text-gray-700 mb-2">Authentification à deux facteurs</h4>
                                <ToggleSwitch label="Activer 2FA" description="Code par SMS ou email" isEnabled={twoFactorAuthEnabled} onToggle={() => setTwoFactorAuthEnabled(!twoFactorAuthEnabled)}/>
                                <div className="mt-4 p-3 text-sm text-gray-600 bg-yellow-50 rounded-lg">L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire.</div>
                            </div>
                        </div>
                    )}

                    {/* 🔔 Contenu NOTIFICATIONS (Structure Plate) */}
                    {activeTab === "notifications" && (
                        <>
                            <h3 className="text-md text-gray-800 mb-6">Notifications</h3>
                            <div className="space-y-4 pt-2 bg-gray-100 rounded-xl px-4 p-2">
                                <ToggleSwitch label="Notifications par email" description="Recevoir des notifications par email" isEnabled={transactionAlertsEnabled} onToggle={() => setTransactionAlertsEnabled(!transactionAlertsEnabled)}/>
                                <ToggleSwitch label="Notifications Push" description="Recevoir des notifications push" isEnabled={pushNotificationsEnabled} onToggle={() => setPushNotificationsEnabled(!pushNotificationsEnabled)}/>
                                <ToggleSwitch label="Alertes de transaction" description="Être notifié de chaque transaction" isEnabled={emailNotificationsEnabled} onToggle={() => setEmailNotificationsEnabled(!emailNotificationsEnabled)}/>
                                <ToggleSwitch label="Emails marketing" description="Recevoir des offres et promotions" isEnabled={marketingEmailsEnabled} onToggle={() => setMarketingEmailsEnabled(!marketingEmailsEnabled)}/>
                            </div>
                        </>
                    )}

                    {/* 🌍 Contenu PRÉFÉRENCES (Structure Plate exacte du prototype) */}
                    {activeTab === "preference" && (
                        <div className="space-y-6">
                            <h3 className="text-md text-gray-800 mb-6">Préférences</h3>
                            
                            {/* --- 1. APPARENCE --- */}
                            <div className="p-4  rounded-xl bg-white shadow-sm">
                                <h4 className="text-base font-semibold text-gray-800 mb-4">Apparence</h4>
                                <div className="bg-gray-200 rounded-lg p-3">
                                    <ToggleSwitch 
                                        label="Mode sombre" 
                                        description={isDarkModeEnabled ? "Désactivé" : "Désactivé"} // Texte fixé sur l'image
                                        isEnabled={isDarkModeEnabled} 
                                        onToggle={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
                                        icon={RiSunLine} // Icône Soleil
                                    />
                                </div>
                            </div>

                            {/* --- 2. LOCALISATION (Langue et Devise sans icône) --- */}
                            <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                                
                                {/* Section Langue */}
                                <div className="mb-6">
                                    <h4 className="text-base font-semibold text-gray-800 mb-2">Langue</h4>
                                    <select
                                        value={selectedLanguage}
                                        onChange={(e) => setSelectedLanguage(e.target.value)}
                                        // Le style est simple et large comme sur l'image
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                                    >
                                        <option value="Français" className="font-light text-sm">Français</option>
                                        <option value="English" className="font-light text-sm" >English</option>
                                        <option value="Español" className="font-light text-sm">Español</option>
                                        <option value="Deutsch" className="font-light text-sm">Deutsch</option>

                                    </select>
                                </div>
                                
                                {/* Section Devise */}
                                <div>
                                    <h4 className="text-base font-semibold text-gray-800 mb-2">Devise</h4>
                                    <select
                                        value={selectedCurrency}
                                        onChange={(e) => setSelectedCurrency(e.target.value)}
                                        // Le style est simple et large comme sur l'image
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                                    >
                                        <option value="EUR (€)" className="font-light text-sm">EUR (€)</option>
                                        <option value="USD ($)" className="font-light text-sm">USD ($)</option>
                                        <option value="GBP (£)" className="font-light text-sm">GBP (£)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}