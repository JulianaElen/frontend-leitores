import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Sobre from './pages/Sobre/Sobre'
import Resultados from './pages/Resultados/GraficoRespostas'
import Respostas from './pages/RespostasPessoais/Respostas'
import Questionario from './pages/Questionario/Questionario'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/questionario" element={<Questionario />} />
      <Route path="/resultados" element={<Resultados />} />
      <Route path="/respostas" element={<Respostas />} />
    </Routes>
  )
}