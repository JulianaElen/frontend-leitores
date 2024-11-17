import React from 'react'
import './Footer.css'

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-links">
                        <a href="#sobre">Sobre</a>
                        <a href="#contato">Contato</a>
                        <a href="#termos">Termos de Uso</a>
                    </div>
                    <p>&copy; 2024 Leitores. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    )
}
