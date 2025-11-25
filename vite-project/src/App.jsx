import React from 'react'
import { Routes, Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import MotdepassOublier from './pages/MotdepassOublier'

import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/motdepasseoublier" element={<MotdepassOublier />} />
    </Routes>
  )
}
