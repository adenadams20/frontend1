import React from "react";
import Dashboard from "./pages/Dashboard";
import Faq from "./pages/FAQ";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Transactions from "./pages/Transactions";
import Navbar from "./components/Navbar";


import { Routes, Route, Outlet } from "react-router-dom";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">

      {/* Sidebar responsive */}
      <Sidebar 
        isOpen={isOpen}
        closeSidebar={() => setIsOpen(false)}
      />

      <div className="flex-1 md:ml-64">

        {/* Navbar */}
        <Navbar openSidebar={() => setIsOpen(true)} />

        {/* Contenu */}
        <div className="pt-20 p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
