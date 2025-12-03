import React from "react";

/**
 * NavTabs réutilisable
 * @param {Array} tabs - Liste des onglets [{ id: 'profil', label: 'Profil' }]
 * @param {string} activeTab - Id de l'onglet actif
 * @param {Function} onTabChange - Callback quand l'onglet change
 * @param {string} className - Classes supplémentaires
 */
export default function NavTab({ tabs, activeTab, onTabChange, className = "" }) {
  return (
    <div className={`flex border-b border-gray-200 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-4 py-2 -mb-px text-sm font-medium focus:outline-none transition
            ${activeTab === tab.id
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
