// 

// frontend1/src/api.js

// Ton backend tourne sur http://localhost:5000
// Et toutes les routes sont préfixées par /api
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

// 🔐 Authentification
export async function login(email, password) {
  // backend : POST /api/auth/login
  return post("/auth/login", { email, password });
}

export async function register(userData) {
  // backend : POST /api/auth/register
  return post("/auth/register", userData);
}

// 🧾 Paiements (EPIC 4 — Paiement factures)
// backend : POST /api/transactions/bill-payment
export async function payBill({ service, reference, amount }, token) {
  return post("/transactions/bill-payment", { service, reference, amount }, token);
}

// 🧾 (optionnel) Récupérer la liste des services de paiement
export async function getPaymentServices(token) {
  // backend : GET /api/transactions/services
  return get("/transactions/services", token);
}

// 📜 Récupérer l’historique des transactions
// backend : GET /api/transactions
export async function getTransactions(token) {
  return get("/transactions", token);
}

/// 👤 Récupérer le profil utilisateur connecté
export async function getUser(token) {
  return get("/profile", token); // backend : GET /api/profile
}


// 👤 Mettre à jour le profil utilisateur
// À faire matcher avec ta route backend : POST /api/user/update ou /api/users/update
export async function updateUser(data, token) {
  return post("/user/update", data, token);
}

// 🔓 Déconnexion
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Export du BASE_URL si besoin ailleurs
export { BASE_URL };