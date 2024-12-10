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
import perguntasJson from '../../perguntas.json';
import './GraficoRespostas.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficoRespostas() {
  const [perguntaId, setPerguntaId] = useState(1);
  const [labels, setLabels] = useState([]);
  const [quantidadeRespostas, setQuantidadeRespostas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [opcoesPergunta, setOpcoesPergunta] = useState({});

  // lista de perguntas do filtro
  const perguntas = [
    { id: 1, texto: "Qual é a sua faixa etária?" },
    { id: 2, texto: "Quais são os seus gêneros literários preferidos?" },
    { id: 3, texto: "Com que frequência você lê livros?" },
    { id: 4, texto: "Quanto você costuma gastar com livros por mês?" },
    { id: 5, texto: "Como você adquire seus livros?" },
    { id: 6, texto: "Quais são os fatores mais importantes ao escolher um livro?" },
    { id: 7, texto: "Você prefere livros mais longos ou mais curtos?" },
    { id: 8, texto: "Qual formato de livro você prefere?" },
    { id: 9, texto: "O que você acha dos livros digitais?" },
    { id: 10, texto: "Você gosta de ler resenhas antes de ler um livro?" },
    { id: 11, texto: "Você já participou de algum clube de leitura?" },
    { id: 12, texto: "Como você costuma descobrir novos livros?" },
  ];

  // pegar a mudança de escolha no filtro e mudar o grafico
  useEffect(() => {
    const buscarRespostas = async () => {
      setCarregando(true);
      setErro('');
      try {
        const dadosPerguntas = perguntasJson;

        const perguntaSelecionada = dadosPerguntas.perguntas.find(p => p.id === perguntaId);

        if (perguntaSelecionada) {
          setOpcoesPergunta(perguntaSelecionada.opcoes || {});
        }

        // Busca respostas para a pergunta
        const responseRespostas = await fetch(`http://localhost:9082/respostas/pergunta/${perguntaId}`);
        if (!responseRespostas.ok) {
          throw new Error('Nenhuma resposta encontrada para esta pergunta.');
        }

        const respostasBackend = await responseRespostas.json();

        // Contando as respostas
        const contagem = respostasBackend.reduce((acc, resposta) => {
          const respostaChaves = resposta.resposta_chave || [];
          respostaChaves.forEach((chave) => {
            acc[chave] = (acc[chave] || 0) + 1;
          });
          return acc;
        }, {});

        // Ordena as respostas pela chave
        const respostasOrdenadas = Object.keys(contagem).sort(); // Ordenação alfabética
        const quantidadesOrdenadas = respostasOrdenadas.map(resposta => contagem[resposta]);

        setLabels(respostasOrdenadas);
        setQuantidadeRespostas(quantidadesOrdenadas);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };

    if (perguntaId) {
      buscarRespostas();
    }
  }, [perguntaId]);

  // cores para as barras dos graficos
  const coresAlternativas = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFD700',
    '#8A2BE2', '#7FFF00', '#D2691E', '#6495ED', '#FF4500',
    '#2E8B57', '#A52A2A', '#2AE0DB'
  ];

  // dados do grafico de barras
  const dataGrafico = {
    labels: labels,
    datasets: [
      {
        label: 'Quantidade de Respostas por questão',
        data: quantidadeRespostas,
        backgroundColor: coresAlternativas.slice(0, labels.length),
        borderColor: coresAlternativas.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grafico-container">
      <h1>Gráfico de Respostas</h1>

      {/* Seletor de Perguntas */}
      <div className="select-container">
        <label htmlFor="pergunta">Escolha uma pergunta: </label>
        <select
          id="pergunta"
          value={perguntaId}
          onChange={(e) => setPerguntaId(Number(e.target.value))}
        >
          {perguntas.map((pergunta) => (
            <option key={pergunta.id} value={pergunta.id}>
              {pergunta.texto}
            </option>
          ))}
        </select>
      </div>

      {/* Exibe o grafico ou erro */}
      {carregando ? (
        <p className="loading-message">Carregando dados...</p>
      ) : erro ? (
        <p className="error-message">{erro}</p>
      ) : (
        <>
          <div className="chart-wrapper">
            <Bar data={dataGrafico} />
          </div>

          {/* Legenda de acordo com a pergunta selecionada */}
          <div className="legend-container">
            <h3>Legenda</h3>
            <ul>
              {labels.map((label, index) => (
                <li key={index}>
                  <span style={{ backgroundColor: coresAlternativas[index % coresAlternativas.length] }}></span>
                  {opcoesPergunta[label] || label} ({label}): {quantidadeRespostas[index] || 0} respostas
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
