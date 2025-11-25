import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// Layout commun : Navbar + Sidebar
function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
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

      {/* Routes protégées / layout commun */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Route fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
