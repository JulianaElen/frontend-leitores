import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {

    const mostraTermos = () => {
  console.log('Alerta disparado!');
  alert(
    'Termos de Uso: \n\n' +
    'Este site, Leitores, é uma plataforma digital para promover a leitura e a troca de experiências literárias. ' +
    'Ao acessar e usar este site, você concorda com os seguintes termos e condições: \n\n' +
    '1. Todo conteúdo presente no site, incluindo textos, imagens, e logos, é de propriedade exclusiva da empresa Leitores, salvo indicação em contrário. ' +
    'É proibido o uso do conteúdo sem autorização prévia. \n' +
    '3. Nós nos comprometemos a proteger sua privacidade e a usar seus dados pessoais apenas conforme descrito em nossa Política de Privacidade. ' +
    'Ao usar este site, você consente com a coleta e uso de suas informações conforme nossa política. \n' +
    '4. O usuário é responsável por manter a segurança de sua conta e senha. Qualquer atividade realizada com sua conta será de sua inteira responsabilidade. \n' +
    '5. Nos reservamos o direito de modificar, suspender ou descontinuar qualquer parte do serviço a qualquer momento, sem aviso prévio. \n' +
    '6. A Leitores não se responsabiliza por qualquer dano direto, indireto, acidental ou consequencial decorrente do uso ou impossibilidade de uso deste site. \n' +
    'Última atualização: Janeiro de 2024.\n\n' +
    'Se você tiver dúvidas sobre nossos termos de uso, entre em contato conosco.'
  );
};

    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-links">
                        <Link to="/sobre" className="footer-link">
                            Conheça o projeto
                        </Link>
                        <a href="mailto:d2021005540@unifei.edu.br" className="contact-link">Contato</a>
                        <a href="#termos" onClick={mostraTermos}>Termos de Uso</a>
                    </div>
                    <p>&copy; 2024 Leitores. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    )
}
