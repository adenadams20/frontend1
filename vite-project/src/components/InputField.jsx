import React from "react";

// --- Composant InputField réutilisable ---
export default function InputField({
  label,           // Label du champ
  value,           // Valeur
  onChange,        // Fonction pour mettre à jour
  type = "text",   // Type d'input: text, email, password, etc.
  placeholder = "",// Placeholder
  showPassword,    // Pour toggle mot de passe (true/false)
  toggleShowPassword, // Fonction pour afficher/masquer le mot de passe
  className = ""   // Classes supplémentaires si besoin
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border-2 bg-gray-50 border-blue-950 rounded-xl mt-4 p-2  outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        {type === "password" && toggleShowPassword && (
          <span
            onClick={toggleShowPassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        )}
      </div>
    </div>
  );
}
