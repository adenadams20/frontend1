import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>

    </>
  )
    
      
     
  
}
