import React, { useEffect, useState } from 'react';
import perguntasData from '../../perguntas.json';
import './Questionario.css';
import { useNavigate } from 'react-router-dom';

export default function Questionario() {
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [email, setEmail] = useState('');
  const [emailErro, setEmailErro] = useState('');
  const [termoErro, setTermoErro] = useState(false);
  const [perguntasErro, setPerguntasErro] = useState({});
  const navigate = useNavigate();

  //carregar perguntas do arquivo
  useEffect(() => {
    setPerguntas(perguntasData.perguntas);
  }, []);

  // atualiza as respostas enquato o usuario marca e desmarca os checkbox
  const handleChange = (perguntaId, respostaChave, isChecked) => {
    setRespostas((prevRespostas) => {
      const novaResposta = prevRespostas[perguntaId] || [];

      if (isChecked) {
        return {
          ...prevRespostas,
          [perguntaId]: [...novaResposta, respostaChave]
        };
      } else {
        return {
          ...prevRespostas,
          [perguntaId]: novaResposta.filter((item) => item !== respostaChave)
        };
      }
    });
  };

  // Atualiza o email do usuario
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailErro('');
  };

  const handleCheckboxChange = () => {
    setTermoErro(false); // Resetar erro de termo ao interagir com os checkbox
  };

  // Função para verificar se todas as perguntas obrigatórias foram respondidas
  const verificarRespostas = () => {
    let erros = {};
    let alertaMostrado = false;

    for (const pergunta of perguntas) {
      const resposta = respostas[pergunta.id];

      if (pergunta.opcoes) {
        if (!resposta || (Array.isArray(resposta) && resposta.length === 0)) {
          erros[pergunta.id] = `Por favor, responda a pergunta: "${pergunta.texto}"`;
          if (!alertaMostrado) {
            alert(`Por favor, responda todas as perguntas.`);
            alertaMostrado = true; // o alerta foi mostrado
          }
        }
      }
    }

    return erros;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se a checkbox de consentimento foi marcada
    const termosCheckbox = event.target.termos.checked;
    if (!termosCheckbox) {
      setTermoErro(true);
      return; // Não envia 
    }

    // Verifica se o e-mail já está cadastrado
    const emailVerificado = await verificarEmail(email);
    if (emailVerificado) {
      alert('Este e-mail já foi cadastrado.');
      return; // Não envia
    }

    // Verifica se todas as perguntas obrigatórias foram respondidas
    const erros = verificarRespostas();
    if (Object.keys(erros).length > 0) {
      setPerguntasErro(erros);
      return; // Não envia 
    }

    try {
      // Enviar o e-mail para criar o usuário
      const userResponse = await fetch('https://backend-leitores.vercel.app/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const userData = await userResponse.json();
      const userId = userData.id;

      // Enviar as respostas para o backend
      for (const [perguntaId, respostaChave] of Object.entries(respostas)) {
        await fetch('https://backend-leitores.vercel.app/respostas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            pergunta_id: perguntaId,
            resposta_chave: respostaChave,
          }),
        });
      }

      alert('Respostas enviadas com sucesso!');
      navigate('/respostas');
    } catch (err) {
      alert('Erro ao enviar respostas. Tente novamente mais tarde.');
    }
  };

  // Função para verificar se o e-mail já está cadastrado
  const verificarEmail = async (email) => {
    try {
      const response = await fetch(`https://backend-leitores.vercel.app/cadastro/${email}`);
      if (response.status === 200) {
        return true;
      } else {
        return false; 
      }
    } catch (err) {
      console.error('Erro ao verificar o e-mail:', err);
      return false;
    }
  };

  return (
    <div className='container-geral'>
      <div id="perguntas-container">
        <h1>Faça o seu Perfil de Leitor</h1>
        <form onSubmit={handleSubmit}>
          {/* Pergunta de E-mail */}
          <div key="email">
            <p id="perguntas">1. Qual é o seu e-mail?</p>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailErro && <p className="erro">{emailErro}</p>} {/* Exibir erro se e-mail já cadastrado */}
          </div>

          {/* Outras perguntas */}
          {perguntas.map((pergunta) => (
            <div key={pergunta.id}>
              <p id="perguntas">{pergunta.id + '. ' + pergunta.texto}</p>
              <div id="opcoes">
                {Object.entries(pergunta.opcoes).map(([chave, texto]) => (
                  <label key={chave}>
                    <input
                      type={pergunta.aceita_multiplas ? 'checkbox' : 'radio'}
                      name={`pergunta_${pergunta.id}`}
                      value={chave}
                      checked={respostas[pergunta.id] && respostas[pergunta.id].includes(chave)}
                      onChange={(e) => handleChange(pergunta.id, chave, e.target.checked)}
                    />
                    {chave + ') ' + texto}
                  </label>
                ))}
                </div>
              {/* Mostrar erro de resposta se houver */}
              {perguntasErro[pergunta.id] && <p className="erro">{perguntasErro[pergunta.id]}</p>}
            </div>
          ))}

          {/* Termo de consentimento */}
          <div id="botao-confirmacao">
            <label>
              <input
                type="checkbox"
                name="termos"
                onChange={handleCheckboxChange}
              />
              Concordo com a divulgação dos dados para fins de análise. Seu e-mail não está incluso nessa divulgação.
            </label>
            {termoErro && <p className="erro">Você precisa concordar com os termos para continuar.</p>} {/* Exibir erro se checkbox não estiver marcada */}
          </div>

          <button id='btn-enviar' type="submit">Enviar Respostas</button>
        </form>
      </div>
    </div>
  );
}
