import React, { useState } from 'react';
import perguntasData from '../../perguntas.json';
import './Respostas.css';

export default function Respostas() {
  const [email, setEmail] = useState('');
  const [respostas, setRespostas] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Altera o email em tempo de escrita
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  //Busca as resposta no BD
  const buscarRespostas = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setRespostas(null);

    try {
      const response = await fetch(`https://backend-leitores.vercel.app/respostas/usuario/${email}`);

      if (!response.ok) {
        throw new Error('Nenhuma resposta encontrada para este e-mail.');
      }

      const respostasBackend = await response.json();

      // Processar as respostas para associar com as perguntas
      const respostasComTexto = respostasBackend.map((resposta) => {
        // Encontrar a pergunta correspondente com base no id do json
        const pergunta = perguntasData.perguntas.find(p => p.id === resposta.pergunta_id);

        // Buscar as opções de resposta 
        const opcoesSelecionadas = resposta.resposta_chave.map(chave => pergunta.opcoes[chave]);

        return {
          pergunta: pergunta.texto,
          respostas: opcoesSelecionadas.join(', ') // Juntar as respostas se for múltipla escolha
        };
      });

      setRespostas(respostasComTexto);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className='container-geral'>
      <div id="resp-container">
        <h1>Minhas Respostas</h1>
        <form onSubmit={buscarRespostas}>
          <label>
            Digite seu e-mail:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <button type="submit" disabled={carregando}>
            {carregando ? 'Carregando...' : 'Buscar Respostas'}
          </button>
        </form>

        {erro && <p className="erro">{erro}</p>}

        {respostas && (
          <div id="respostasContainer">
            <h2>Respostas de {email}</h2>
            <ul>
              {respostas.map((resposta, index) => (
                <li key={index}>
                  <strong>Pergunta:</strong> {resposta.pergunta} <br />
                  <strong>Resposta:</strong> {resposta.respostas}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
