// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../services/api"; // utilise ton API profil

const AuthContext = createContext(null);

// 🔹 Provider qui va entourer toute ton app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Au démarrage, si un token existe, on charge le profil
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoadingAuth(false);
      return;
    }
    // ajouter
    const fetchProfile = async () => {
    try {
      const profile = await getUser(token); // /api/profile → profile + avatarUrl
      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (e) {
      console.error("Erreur chargement profil:", e);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };
    const loadProfile = async () => {
      try {
        const profile = await getUser(token);
        setUser(profile);
      } catch (e) {
        console.error("Erreur chargement profil initial :", e);
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };

    loadProfile();
  }, []);

  // Appelé après un login réussi
  const login = (token, userPayload) => {
    localStorage.setItem("token", token);
    if (userPayload) {
      localStorage.setItem("user", JSON.stringify(userPayload));
    }
    // on garde l'info du backend (userPayload) dans le contexte
    setUser(userPayload || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pratique
export function useAuth() {
  return useContext(AuthContext);
}
