import React from "react";
import {  Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Faq from "./pages/FAQ";

export default function App() {
  return (
    
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Transactions />} />
         <Route path="/Faq" element={<Faq />} />
      </Routes>
  );
}

