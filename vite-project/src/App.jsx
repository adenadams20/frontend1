import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import { Outlet, Routes, Route } from "react-router-dom";

// Pages
import Transfer from "./pages/Transfer.jsx";

export default function App() {
  return (
    <div>
      {/* Sidebar fixe */}
      <Sidebar />

      {/* Navbar fixe */}
      <Navbar />

      {/* Contenu principal */}
      <div className="ml-64 mt-16 p-6">
        <Routes>
          {/* Page de transfert */}
          <Route path="/transfer" element={<Transfer />} />

          {/* Autres pages (si tu en ajoutes) */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/transactions" element={<Transactions />} /> */}
        </Routes>

        <Outlet />
      </div>
    </div>
  );
}
