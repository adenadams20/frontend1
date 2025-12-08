// frontend1/src/api.js

const BASE_URL = "http://localhost:5000"; // <- remplace par ton backend en prod si besoin

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

// Authentification
export async function login(email, password) {
  return post("/auth/login", { email, password });
}

export async function register(userData) {
  return post("/auth/register", userData);
}

// Paiements
export async function payBill({ service, reference, amount }, token) {
  return post("/paiement", { service, reference, amount }, token);
}

// Récupérer l’historique des transactions
export async function getTransactions(token) {
  return get("/transactions", token);
}

// Récupérer le profil utilisateur
export async function getUser(token) {
  return get("/user/me", token);
}

// Mettre à jour le profil utilisateur
export async function updateUser(data, token) {
  return post("/user/update", data, token);
}

// Déconnexion
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Export du BASE_URL si besoin ailleurs
export { BASE_URL };
