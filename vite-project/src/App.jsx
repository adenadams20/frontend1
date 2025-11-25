import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";

export default function App() {
  return (
    
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Transactions />} />
      </Routes>
  );
}
