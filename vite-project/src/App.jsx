import React from "react";


import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Faq from "./pages/FAQ";


import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions";
import Transfer from "./pages/Transfer.jsx";

import Register from './pages/Register';
import Login from './pages/Login';
import MotdepassOublier from './pages/MotdepassOublier';
import Paiement from './pages/Paiement';
import Settings from './pages/Settings';

import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// Layout principal (Sidebar + Navbar)
function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}



import "./index.css"; 

function App() {
  

  return (
    <Routes>

      {/* Page par défaut → Login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Pages SANS sidebar / navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/motdepasseoublier" element={<MotdepassOublier />} />

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



