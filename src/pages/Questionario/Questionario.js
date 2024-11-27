import React, { useEffect, useState } from 'react';
import perguntasData from '../../perguntas.json';
import './Questionario.css';

export default function Questionario() {
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [email, setEmail] = useState('');
  const [emailErro, setEmailErro] = useState('');
  const [termoErro, setTermoErro] = useState(false);
  const [perguntasErro, setPerguntasErro] = useState({}); // Inicializando como objeto vazio

  useEffect(() => {
    setPerguntas(perguntasData.perguntas);
  }, []);

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailErro(''); // Resetar erro de email ao digitar
  };

  const handleCheckboxChange = () => {
    setTermoErro(false); // Resetar erro de termo ao interagir com a checkbox
  };

  // Função para verificar se todas as perguntas obrigatórias foram respondidas
  const verificarRespostas = () => {
    let erros = {};

    for (const pergunta of perguntas) {
      const resposta = respostas[pergunta.id];

      if (Array.isArray(resposta)) {
        // Se a resposta for um array (quando aceita múltiplas respostas), você pode tratá-la de outra forma
        if (resposta.length === 0) {
          erros[pergunta.id] = `Por favor, responda a pergunta: "${pergunta.texto}"`;
        }
      } else {
        // Caso contrário, trata como uma string e aplica trim
        if (!String(resposta).trim()) {
          erros[pergunta.id] = `Por favor, responda a pergunta: "${pergunta.texto}"`;
        }
      }
    }
    return erros; // Retorna o objeto com os erros
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar se a checkbox de consentimento foi marcada
    const termosCheckbox = event.target.termos.checked;
    if (!termosCheckbox) {
      setTermoErro(true);
      return; // Não envia o formulário se a checkbox não estiver marcada
    }

    // Verificar se o e-mail já está cadastrado
    const emailVerificado = await verificarEmail(email);
    if (emailVerificado) {
      setEmailErro('Este e-mail já está cadastrado.');
      return; // Não envia o formulário se o e-mail já estiver cadastrado
    }

    // Verificar se todas as perguntas obrigatórias foram respondidas
    const erros = verificarRespostas();
    if (Object.keys(erros).length > 0) {
      setPerguntasErro(erros);
      return; // Não envia o formulário se houver perguntas não respondidas
    }

    try {
      // Enviar o e-mail para criar o usuário
      const userResponse = await fetch('http://localhost:9082/cadastro', {
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
        await fetch('http://localhost:9082/respostas', {
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
    } catch (err) {
      console.error('Erro ao enviar respostas:', err);
      alert('Erro ao enviar respostas. Tente novamente mais tarde.');
    }
  };

  // Função para verificar se o e-mail já está cadastrado
  const verificarEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:9082/cadastro/${email}`);
      if (response.status === 200) {
        return true; // E-mail já cadastrado
      } else {
        return false; // E-mail não cadastrado
      }
    } catch (err) {
      console.error('Erro ao verificar o e-mail:', err);
      return false; // Em caso de erro, assume-se que o e-mail não está cadastrado
    }
  };

  return (
    <div id="perguntasContainer">
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
            <p id="perguntas">
              {pergunta.id + '. ' + pergunta.texto}
            </p>
            {pergunta.opcoes ? (
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
            ) : (
              <input
                type="text"
                placeholder="Digite sua resposta"
                value={respostas[pergunta.id] || ''} // Garantir que a resposta seja uma string ou um valor válido
                onChange={(e) => handleChange(pergunta.id, e.target.value, true)}
              />
            )}
            {/* Mostrar erro de resposta se houver */}
            {perguntasErro[pergunta.id] && <p className="erro">{perguntasErro[pergunta.id]}</p>}
          </div>
        ))}

        {/* Termo de consentimento */}
        <div id="botaoConfirmacao">
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

        <button type="submit">Enviar Respostas</button>
      </form>
    </div>
  );
}
