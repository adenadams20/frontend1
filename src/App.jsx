import React, { useState } from "react";

import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Faq from "./pages/FAQ";
import ConditiondUtilisation from './pages/ConditiondUtilisation'


import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions";
import Transfer from "./pages/Transfer.jsx";

import Register from './pages/Register';
import Login from './pages/Login';
import MotdepassOublier from './pages/MotdepassOublier';
import Paiement from './pages/Paiement';
import Settings from './pages/Settings';

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import "./index.css";

// Layout principal (Sidebar + Navbar)
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex relative z-0">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 md:ml-64">
        <Navbar onSidebarToggle={() => setSidebarOpen(true)} />

        <div className="p-4 pt-20">
          <Outlet />
        </div>

      </div>
    </div>
  );
}



function App() {
  return (
    <Routes>

      {/* Page par défaut → Login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Pages SANS sidebar / navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/motdepassoublier" element={<MotdepassOublier />} />
      <Route path="/conditiondutilisation" element={<ConditiondUtilisation/>} /> 


      {/* Pages AVEC layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/paiement" element={<Paiement />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/faq" element={<Faq />} />
      </Route>

    </Routes>
  );
}

export default App;
