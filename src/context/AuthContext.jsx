// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Au démarrage: si token -> récupérer /me pour avoir avatarUrl (cloud)
  useEffect(() => {
    const token = localStorage.getItem("token");

    const loadProfile = async () => {
      if (!token) {
        setLoadingAuth(false);
        return;
      }

      try {
        const profile = await getUser(token);

        // ⚠️ selon ton API, getUser peut renvoyer profile direct ou { user: profile }
        const normalized = profile?.user ? profile.user : profile;

        setUser(normalized);
        localStorage.setItem("user", JSON.stringify(normalized));
      } catch (e) {
        console.error("Erreur chargement profil :", e);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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

    // userPayload doit contenir avatarUrl venant du backend
    if (userPayload) {
      localStorage.setItem("user", JSON.stringify(userPayload));
      setUser(userPayload);
    } else {
      setUser(null);
    }
  };

  // Pour mettre à jour l’utilisateur (ex: avatarUrl après upload)
  const updateUser = (partial) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...(partial || {}) };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, updateUser, login, logout, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
