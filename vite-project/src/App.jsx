import React from 'react'
import { Routes, Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import MotdepassOublier from './pages/MotdepassOublier'
import Paiement from './pages/Paiement'

import './App.css'

export default function App() {
  return (
     <Routes>
       
        <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
      <Route path="/motdepasseoublier" element={<MotdepassOublier />} /> 
      <Route path="/paiement" element={<Paiement />} /> 
      

    </Routes>
    
  )
}
