import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";

// Pages
import Transfer from "./pages/Transfer";

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
            <Route path="/transfer" element={<Transfer />} />
          </Routes>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
