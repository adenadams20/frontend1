// frontend1/src/services/api.js
import axios from "axios"; //ajouter
const BASE_URL = "http://localhost:5000/api";

// Fonction générique pour POST
async function post(endpoint, data, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Erreur API");
  return result;
}

// Fonction générique pour GET
async function get(endpoint, token = null) {
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Erreur API");
  return result;
}

//  NOUVEAU : Fonction générique pour PUT
async function put(endpoint, data, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Erreur API");
  return result;
}

//  Authentification
export async function login(email, password) {
  // backend : POST /api/auth/login
  return post("/auth/login", { email, password });
}

export async function register(userData) {
  // backend : POST /api/auth/register
  return post("/auth/register", userData);
}

//  Paiements
export async function payBill({ service, reference, amount }, token) {
  return post("/transactions/bill-payment", { service, reference, amount }, token);
}

export async function getPaymentServices(token) {
  return get("/transactions/services", token);
}

//  Récupérer l’historique des transactions
export async function getTransactions(token) {
  return get("/transactions", token);
}

//  Récupérer le profil utilisateur connecté
export async function getUser(token) {
  const data = await get("/profile", token); // backend : GET /api/profile
  return data.profile;                       //  on renvoie directement le profil
}

//  Mettre à jour le profil utilisateur (à aligner côté backend si besoin)
export async function updateUser(data, token) {
  return put("/profile", data, token);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// funcion d upload pour la photo
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function uploadAvatar(file, token) {
  const formData = new FormData();
  formData.append("avatar", file); // ✅ doit s'appeler "avatar"

  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/profile/avatar`, {
    method: "POST",
    headers,          // ✅ pas de Content-Type ici
    body: formData,   // ✅ FormData
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Erreur upload avatar");
  return result;
}

//  Changer le mot de passe de l'utilisateur connecté
export async function changePassword({ currentPassword, newPassword }, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/profile/change-password`, {
    method: "PUT", //  backend: router.patch("/change-password", ...)
    headers,
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Erreur API");
  return result;
}
export { BASE_URL };