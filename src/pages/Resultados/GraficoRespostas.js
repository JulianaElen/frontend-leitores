import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoRespostas = () => {
  const [labels, setLabels] = useState([]);
  const [quantidadeRespostas, setQuantidadeRespostas] = useState([]);

  useEffect(() => {
    const data = [
      { resposta: "a" },
      { resposta: "b" },
      { resposta: "a" }
    ];

    const contagem = data.reduce((acc, item) => {
      const resposta = item.resposta || "Indefinida"; // Use a chave correta
      acc[resposta] = (acc[resposta] || 0) + 1;
      return acc;
    }, {});

    const respostas = Object.keys(contagem); // Exemplo: ['a', 'b']
    const quantidades = Object.values(contagem); // Exemplo: [2, 1]

    setLabels(respostas);
    setQuantidadeRespostas(quantidades);
  }, []);

  const dataGrafico = {
    labels: labels,
    datasets: [
      {
        label: 'Quantidade de Respostas',
        data: quantidadeRespostas,
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'],
        borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar data={dataGrafico} />
    </div>
  );
};

export default GraficoRespostas;
