import React, { useState } from 'react'
import './MenuPrincipal.css'

export default function MenuPrincipal() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div className="menu-container">
                <div className='menu-icon'>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </button>
                    <p className="nome-empresa">Leitores</p>
                </div>
                <nav className={`menu ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li><a href="#responder-pergunta">Responder Perguntas</a></li>
                        <li><a href="#minhas-respostas">Minhas Respostas</a></li>
                        <li><a href="#resultados-gerais">Resultados Gerais</a></li>
                    </ul>
                    <div className="sobre-projeto">
                        <a href="#sobre-projeto">Conheça o Projeto</a>
                    </div>
                </nav>
            </div>
        </>
    )
}
