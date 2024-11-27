import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaRegLightbulb } from 'react-icons/fa'; // Ícone de Lâmpada
import { MdEmail } from 'react-icons/md'; // Ícone de Email
import { AiFillFileText } from 'react-icons/ai'; // Ícone de Documento

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mostraTermos = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <div><FaRegLightbulb title="Lâmpada" />
            <Link to="/sobre" className="footer-link">Conheça o projeto</Link>
            </div>
            <div><MdEmail title="Email" />
            <a href="mailto:d2021005540@unifei.edu.br" className="contact-link">Contato</a>
            </div>
            <div> <AiFillFileText title="Documento" />
            <a href="#termos" onClick={mostraTermos}>Termos de Uso</a>
            </div>
          </div>
          <p>&copy; 2024 Leitores. Todos os direitos reservados.</p>
        </div>
      </footer>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>X</button>
            <h2>Termos de Uso</h2>
            <p>
              Este site, Leitores, é uma plataforma digital para promover a leitura e a troca de experiências literárias.
              Ao acessar e usar este site, você concorda com os seguintes termos e condições:
            </p>
            <ul>
              <li>Todo conteúdo presente no site, incluindo textos, imagens e logos, é de propriedade exclusiva da empresa Leitores, salvo indicação em contrário.</li>
              <li>É proibido o uso do conteúdo sem autorização prévia.</li>
              <li>Nos comprometemos a proteger sua privacidade e a usar seus dados pessoais apenas conforme descrito em nossa Política de Privacidade.</li>
              <li>O usuário é responsável por manter a segurança de sua conta e senha. Qualquer atividade realizada com sua conta será de sua inteira responsabilidade.</li>
              <li>Nos reservamos o direito de modificar, suspender ou descontinuar qualquer parte do serviço a qualquer momento, sem aviso prévio.</li>
              <li>A Leitores não se responsabiliza por qualquer dano direto, indireto, acidental ou consequencial decorrente do uso ou impossibilidade de uso deste site.</li>
            </ul>
            <p>Última atualização: Janeiro de 2024.</p>
            <p>Se você tiver dúvidas sobre nossos termos de uso, entre em contato conosco.</p>
          </div>
        </div>
      )}
    </>
  );
}
