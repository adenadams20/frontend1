import React from "react";

import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions";
import Transfer from "./pages/Transfer.jsx";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// Layout commun : Sidebar + Navbar + Contenu dynamique
function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 ">
        <Navbar />
        <div className="flex justify-center align-center">
          <Outlet />  
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Redirection racine vers dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Layout pour les pages internes */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        {/* Ajoute ici toutes tes autres pages */}
        <Route path="/transfer" element={<Transfer />} />
      </Route>
    </Routes>
  );
}
