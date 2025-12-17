import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        settings: "Paramètres",
        profile: "Profil",
        security: "Sécurité",
        notifications: "Notifications",
        preferences: "Préférences",
        language: "Langue",
        french: "Français",
        english: "Anglais",
        light: "Clair",
        dark: "Sombre",
      },
    },
    en: {
      translation: {
        settings: "Settings",
        profile: "Profile",
        security: "Security",
        notifications: "Notifications",
        preferences: "Preferences",
        language: "Language",
        french: "French",
        english: "English",
        light: "Light",
        dark: "Dark",
      },
    },
  },
  lng: localStorage.getItem("lang") || "fr",
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
