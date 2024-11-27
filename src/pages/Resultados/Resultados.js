import React from 'react'
import GraficoRespostas from './GraficoRespostas'

export default function Resultados() {
  return (
    <div>
    <h1>Gráfico de Respostas</h1>
    <GraficoRespostas perguntaId={1} /> {/* Exemplo com ID 1 */}
  </div>
  )
}
