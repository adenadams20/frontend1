import React from "react";

export default function Button({
  children,       // Texte du bouton
  onClick,        // Fonction au clic
  type = "button",// Type du bouton: button, submit, reset
  className = "", // Classes supplémentaires
  disabled = false, 
  loading = false // État de chargement
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        px-4 py-2 rounded-xl font-semibold transition duration-150
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
        ${loading ? "opacity-70" : ""}
        ${className}
      `}
    >
      {loading ? "Chargement..." : children}
    </button>
  );
}
